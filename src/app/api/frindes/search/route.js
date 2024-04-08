import connect from "@/db/connect";
import User from "@/models/user.models";
import {NextResponse} from "next/server";

export async function POST(req) {
  await connect()
  const {searchWord} = await req.json()
  const findFriend = await User.find().or([{mobile: searchWord}, {email: searchWord}]).select({
    name: true,
    email: true,
    _isActive: true,
    mobile: true,
    _id: true
  });
  if (!findFriend) {
    return NextResponse.json({message: " cant find friends"}, {status: 404});
  }
  return NextResponse.json({message: " friend found", list: findFriend}, {status: 200});
}

