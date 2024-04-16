import Product from "@/models/product";
import { NextResponse } from "next/server";
import connect from "@/db/connect";

export async function GET() {
  await connect();
  const products = await Product.find();
  return NextResponse.json(products);
}
export async function POST(req) {
  await connect();
  const data = await req.json();
  const sameProduct = await Product.find({ brand: data.brand_id });
  if (sameProduct) {
    return NextResponse.json({ sameProduct });
  }
}
export async function PUT(req) {
  await connect();
  const data = await req.json();
  const prodect = await Product.findById(data.id);
  if (!prodect) {
    return NextResponse.json({ message: "Product not found" });
  }
  prodect[data.item] = data.value;
  await prodect.save();
  return NextResponse.json({ message: "product is update" }, { status: 200 });
}
