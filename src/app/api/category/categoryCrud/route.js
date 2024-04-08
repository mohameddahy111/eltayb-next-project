import Category from "@/models/category";
import {NextResponse} from "next/server";
import connect from "@/db/connect";
import {verifyToken} from "@/utils/verifyToken";
import {cookies} from "next/headers";


export async function POST(req) {
  const cookie =cookies().get("login_token")

  if (!cookie) {
    return NextResponse.json({message: "token is expierd"}, {status: 401});
  }
  const {id} = await verifyToken(cookie.value)

  const data = await req.json()
  await connect()
  const isExist = await Category.findOne({name: data.name})
  if (isExist) {
    return NextResponse.json({message: "this category is already exist"}, {status: 400})
  }
  const newCategory = await Category.insertMany({
    //TODO : ADD IMAGE //
    name: data.name,
    createdBy:id,
    image :{
      scr :data.image,
      id :""
    }
  })

  return NextResponse.json({message: "done", newCategory}, {status: 200})
}
