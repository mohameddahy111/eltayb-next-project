import connect from "@/db/connect";
import Oredr from "@/models/orders";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  const newOrders = await Oredr.find({ seen: false }).populate([
    { path: "userId", select: ["name", "email"] }
  ]);
  const orders = newOrders.reverse();
  return NextResponse.json({ number: newOrders.length, newOrders: orders });
}
