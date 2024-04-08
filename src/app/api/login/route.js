import connect from "@/db/connect";
import User from "@/models/user.models";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";
import {getToken, verifyToken} from "@/utils/verifyToken";

export async function POST(req) {
  const cookieStore = cookies();
  await connect();
  const {mobile, email, password} = await req.json();
  if (mobile || email || password) {
  }
  const findUser = await User.findOne().or([{mobile}, {email}]);
  if (!findUser) {
    return NextResponse.json({message: "this user not found"}, {status: 401});
  }
  const match = bcrypt.compareSync(password, findUser.password, 8);
  if (!match) {
    return NextResponse.json({message: "password mismatch"}, {status: 401});
  }
  // TODO: check _isVeryfid true or false
  const token = await getToken({id: findUser._id});
  const saveToken = cookieStore.set("login_token", token, {maxAge: 60 * 60});
  const user = await User.findByIdAndUpdate(
   findUser._id,
   {_isActive: true},
   {new: true}
  ).select({password: false});
  const userToken = cookieStore.set("userInfo", JSON.stringify(user), {maxAge: 60 * 60});
  return new Response(
   JSON.stringify({message: `welcome ${findUser.name}` , id : user._id}),
   {
     status: 200,
     // headers: {"Set-Cookie": [`${saveToken}`, `${userToken}`]}
   }
  );
}

export async function GET(req) {
 await connect()
  let cookie = req.cookies.get("login_token")
  const {id} = await verifyToken(cookie.value)

  if (!id) {
    return NextResponse.json({message: "token is expierd"}, {status: 401});
  }
 cookies().delete('login_token')
  cookies().delete("userInfo")
  const user = await User.findOneAndUpdate({_id:id}, {_isActive: false});
  return NextResponse.json({message: `${user.name}, logged out successfully `}, {status: 200});
}
