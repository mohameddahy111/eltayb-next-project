import {verifyToken} from "@/utils/verifyToken";
import {NextResponse} from "next/server";

import connect from "@/db/connect";
import Frindes from "@/models/frindeslist.models";

export async function GET(req) {
  connect()
  const cookie = req.cookies.get("login_token")
  if (!cookie) {
    return NextResponse.json({message: " your are  Unauthorized"}, {status: 401})
  }
  // const {}  = req.json()
  const {id} = await verifyToken(cookie.value)
  if (!id) {
    return NextResponse.json({message: " not found list"}, {status: 401})
  }
  const list = await Frindes.findOne({userId: id})
  if (!list) {
    return NextResponse.json({message: "add some frinds to your list" , list :[]}, {status: 200})
  }
  return NextResponse.json({message: " find list " , list},{status: 200})
}

