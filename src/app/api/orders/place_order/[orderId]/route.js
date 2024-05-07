import connect from "@/db/connect";
import Oredr from "@/models/orders";
import { verifyToken } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connect();
  const { orderId } = params;
  const order = await Oredr.findById(orderId).populate([
    { path: "userId", select: ["name", "email", "mobile"] },
    { path: "seenBy", select: ["name", "email", "mobile"] }
  ]);
  return NextResponse.json({ order });
}
export async function PUT(req, { params }) {
  await connect();
  const userId = cookies().get("login_token");
  if (!userId) {
    return NextResponse.json(
      { message: " not found Admin please loggin first" },
      { status: 401 }
    );
  }
  const data = await req.json();
  const { id } = await verifyToken(userId.value);
  const { orderId } = params;
  const order = await Oredr.findById(orderId);
  if (data.item == "seen") {
    order[data.item] = data.value;
    order.seenBy = id;
    order.seenAt = new Date().toLocaleString();
  } else {
    order[data.item] = data.value;
  }
  await order.save();

  return NextResponse.json({ message: "order is seen " });
}
