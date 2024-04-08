import Category from "@/models/category";
import {NextResponse} from "next/server";
import connect from "@/db/connect";


export async function GET() {
 await connect()
  const  categories = await Category.find()
  return NextResponse.json(categories)
}