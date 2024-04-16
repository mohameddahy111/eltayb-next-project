import connect from "@/db/connect";
import Oredr from "@/models/orders";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connect();
  const { orderId } = params;
  const order = await Oredr.findById(orderId).populate([
    { path: "userId", select: ["name", "email", "mobile"] }
  ]);
  return NextResponse.json({ order });
}
