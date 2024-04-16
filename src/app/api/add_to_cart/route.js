import { cookies } from "next/headers";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";
import Cart from "@/models/cart";
import Product from "@/models/product";
import connect from "@/db/connect";

export async function POST(req) {
  await connect();
  const data = await req.json();
  const cookie = cookies().get("login_token");
  if (!cookie) {
    return NextResponse.json(
      { message: " must be logged in" },
      { status: 401 }
    );
  }
  const { id } = await verifyToken(cookie.value);
  if (!id) {
    return NextResponse.json({ message: "cannot find user " }, { status: 401 });
  }
  const product = await Product.findOne({ _id: data.productId });
  if (!product) {
    return NextResponse.json(
      { message: "cannot find product" },
      { status: 404 }
    );
  }
  const item = product.price.find((x) => x.size === data.size);
  if (!item) {
    return NextResponse.json(
      { message: "cannot find product" },
      { status: 404 }
    );
  }
  if (data.quantity > item.quantity) {
    return NextResponse.json(
      { message: "quantity not in Stock" },
      { status: 400 }
    );
  }
  const cart = await Cart.findOne({ userId: id });
  if (!cart) {
    const newCart = new Cart({
      userId: id,
      items: [
        {
          productId: data.productId,
          quantity: data.quantity,
          size: data.size,
          notes: data.notes,
          productName: data.productName,
          offer_value: item.value_of_offer,
          totalPrice: data.quantity * item.value,
          total_After_Discount: data.quantity * item.final_price,
          price: item.value,
          final_price: item.final_price
        }
      ]
    });
    const cartItems = await newCart.save();
    cookies().set("cartItems", JSON.stringify(cartItems));
    return NextResponse.json({ message: "successfully added cart" });
  } else {
    const isExistItem = cart.items.filter(
      (x) => x.productName === data.productName
    );
    if (isExistItem.length > 0) {
      const sameSize = isExistItem.find((z) => z.size === data.size);
      if (sameSize) {
        const newQuantity = sameSize.quantity + data.quantity;
        if (newQuantity > item.quantity) {
          return NextResponse.json(
            { message: "quantity not in Stock" },
            { status: 400 }
          );
        }

        sameSize.quantity = newQuantity;
        sameSize.totalPrice = newQuantity * item.value;
        sameSize.total_After_Discount = newQuantity * item.final_price;
        item.quantity = item.quantity - newQuantity;
        await product.save();
        const cartItems = await cart.save();
        cookies().set("cartItems", JSON.stringify(cartItems));
        return NextResponse.json({ message: "successfully added cart" });
      } else {
        const newItem = {
          productId: data.productId,
          quantity: data.quantity,
          size: data.size,
          notes: data.notes,
          productName: data.productName,
          offer_value: item.value_of_offer,
          totalPrice: data.quantity * item.value,
          total_After_Discount: data.quantity * item.final_price,
          price: item.value,
          final_price: item.final_price
        };
        cart.items.push(newItem);

        const cartItems = await cart.save();
        cookies().set("cartItems", JSON.stringify(cartItems));

        return NextResponse.json({ message: "successfully added cart" });
      }
    } else {
      const newItem = {
        productId: data.productId,
        quantity: data.quantity,
        productName: data.productName,
        size: data.size,
        notes: data.notes,
        offer_value: item.value_of_offer,
        totalPrice: data.quantity * item.value,
        total_After_Discount: data.quantity * item.final_price,
        price: item.value,
        final_price: item.final_price
      };
      cart.items.push(newItem);

      const cartItems = await cart.save();
      cookies().set("cartItems", JSON.stringify(cartItems));

      return NextResponse.json({ message: "successfully added cart" });
    }
  }
}

export async function PUT(req) {
  await connect();
  const { itemId, quantity } = await req.json();
  const cartCookies = cookies().get("cartItems");
  const { _id } = JSON.parse(cartCookies.value);
  const cart = await Cart.findById(_id);
  if (!cart) {
    return NextResponse.json({ message: "cart not found", status: 404 });
  }
  const item = cart.items.find((item) => item._id == itemId);
  if (!item) {
    return NextResponse.json({ message: "item not found" }, { status: 404 });
  }
  const product = await Product.findById(item.productId);

  const aa = product.price.find((ele) => ele.size == item.size);
  if (aa.quantity < quantity) {
    return NextResponse.json(
      { message: `max quantity is ${aa.quantity} ` },
      { status: 404 }
    );
  }
  item.quantity = quantity;
  item.totalPrice = item.price * quantity;
  item.total_After_Discount = item.final_price * quantity;
  const cartItems = await cart.save();
  cookies().set("cartItems", JSON.stringify(cartItems));
  return NextResponse.json({ message: "The product has been modified" });
}
