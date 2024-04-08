import {NextResponse} from "next/server";
import User from "@/models/user.models";
import connect from "@/db/connect";

export async function GET(req, {params}) {
  connect()
  const {profile} = params
  const findFrind = await User.findById(profile).select({
    name: true,
    email: true,
    mobile: true,
    _isActive: true,
    _id: true,
  });
  if (!findFrind) {
    return NextResponse.json({message: "No frind with this profile"} , {status: 404});
  }
  return NextResponse.json({user: findFrind}, {status: 200});
}