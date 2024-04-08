
import {NextResponse} from "next/server";
import connect from "@/db/connect";
import {verifyToken} from "@/utils/verifyToken";
import {cookies} from "next/headers";
import Brand from "@/models/brands";


export async function POST(req) {
  const cookie =cookies().get("login_token")
  
  if (!cookie) {
    return NextResponse.json({message: "token is expierd"}, {status: 401});
  }
  const {id} = await verifyToken(cookie.value)

  const data = await req.json()
  await connect()
  const isExist = await Brand.findOne({name: data.name})
  if (isExist) {
    return NextResponse.json({message: "this category is already exist"}, {status: 400})
  }
  const newBrand = await Brand.insertMany({
    //TODO : ADD IMAGES//
    name: data.name,
    createdBy:id,
    category:data.category,
    image:{
      scr:data.image,
      id:""
    },
  })
  
  return NextResponse.json({message: "done", newBrand}, {status: 200})
}
