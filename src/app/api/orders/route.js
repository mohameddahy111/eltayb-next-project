import connect from "@/db/connect";
import Address from "@/models/address";
import Cart from "@/models/cart";
import Oredr from "@/models/orders";
import Product from "@/models/product";
import { verifyToken } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
  const cartId = await Cart.findOneAndDelete({ userId: id });
  const address = await Address.findOne({ userId: id });
  const shippingAddress = address.address.find((ele) => ele._id == data.choese);
  const newOrder = new Oredr({
    userId: id,
    items: cartId.items,
    shipping_Details: shippingAddress,
    total_price: cartId.total_cart_price,
    toatl_After_Descount: cartId.total_Cart_After_Discount
  });
  cartId.items.map(async (ele) => {
    const product = await Product.findById(ele.productId);
    if (product) {
      product.price.map((x) => {
        if (x.size === ele.size) {
          x.quantity = x.quantity - ele.quantity;
          product.save();
        }
      });
    }
  });
  const order = await newOrder.save();
  cookies().delete("cartItems");

  return NextResponse.json({ message: "", order });
}
