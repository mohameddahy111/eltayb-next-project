import { NextResponse } from "next/server";

import connect from "@/db/connect";
import Oredr from "@/models/orders";
import { verifyToken } from "@/utils/verifyToken";
import { cookies } from "next/headers";

export async function GET(res) {
  await connect();
  const cookie = cookies().get("login_token");
  if (!cookie) {
    return NextResponse.json({ message: "must be login first" });
  }
  const { id } = await verifyToken(cookie.value);
  if (!id) {
    return NextResponse.json({ message: "cannot find user " }, { status: 401 });
  }
  const orders = await Oredr.find({ userId: id });
  const total =parseFloat(orders.reduce((a, b) => a + b.payment_total ,0)).toFixed(2);
  const allOrders = orders.length
  const list = orders.reverse().slice(0 , 10)
  return NextResponse.json({ orders:list , total ,allOrders  });
}
