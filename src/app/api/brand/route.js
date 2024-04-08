import {NextResponse} from "next/server";
import Brand from "@/models/brands";

export async function GET() {
  const  brands = await Brand.find()
  return NextResponse.json(brands)
}