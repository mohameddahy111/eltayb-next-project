import connect from "@/db/connect";
import User from "@/models/user.models";
import {verifyToken} from "@/utils/verifyToken";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";

export async function GET(req,) {
 await connect();
  let cookie = req.cookies.get("login_token");
  const {id} = await verifyToken(cookie.value);
  if (!id) {
    return NextResponse.json({message: "token is expierd"}, {status: 401});
  }
  const user = await User.findById(id).select({password: false}).populate('orders');
  return NextResponse.json({user});
}

export async function PUT(req, ) {
  await connect();
  let cookie = req.cookies.get("login_token");
  const body = await req.json();
  const {id} = await verifyToken(cookie.value);
  if (!id) {
    return NextResponse.json({message: "token is expierd"}, {status: 401});
  }
  const findUser = await User.findById(id);
  if (body?.mobile !== findUser.mobile || body?.email !== findUser.email) {
    const isExistUser = await User.findOne().or([
      {mobile: body.mobile},
      {email: body.email}
    ]);
    if (isExistUser) {
      return NextResponse.json(
       {message: "this emaill or mobile is use before "},
       {status: 401}
      );
    }
  }
  if (body.password) {
    let matchPassword = bcrypt.compareSync(body.password, findUser.password, 8);
    if (!matchPassword) {
      cookies().delete("login_token");
      await User.findOneAndUpdate({_id: id}, body, {new: true});
      return NextResponse.redirect(
       new URL("/login", req.url)
      );
    }
  }
  const user = await User.findOneAndUpdate({_id: id}, body, {new: true}).select(
   {password: false}
  );
  cookies().delete("userInfo")
  cookies().set("userInfo_2", JSON.stringify(user));
  return NextResponse.json({message: `${user.name} update his profile`, user});
}
