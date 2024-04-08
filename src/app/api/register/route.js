import connect from "@/db/connect";
import User from "@/models/user.models";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connect();
    const { mobile, email , password  , name} = await req.json();
  const findUser = await User.findOne().or([{mobile} , {email}]);
  if (findUser) {
    return NextResponse.json({message: "this emaill or mobile is use before "},{status:401})
  }
    const user = new User({
      name , email , password , mobile
    })
  await user.save()
  
  //TODO :  Veryfid emaill

  return NextResponse.json({message: "OK"} , {status:201});
}
