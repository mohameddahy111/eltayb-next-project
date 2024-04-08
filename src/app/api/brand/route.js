import {NextResponse} from "next/server";
import Brand from "@/models/brands";
import connect from "@/db/connect";

export async function GET() {
  await  connect()
  const  brands = await Brand.find()
  return NextResponse.json(brands)
}