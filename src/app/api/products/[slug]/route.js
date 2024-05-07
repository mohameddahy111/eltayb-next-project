import Product from "@/models/product";
import {NextResponse} from "next/server";
import connect from "@/db/connect";

export async function GET(req, {params}) {
  await connect()
  const {slug} = params;
  const product = await Product.findOne({slug})
   .populate([{
     path: "category",
     select: ['name', '_id',]
   },
     {path:"brand", select: ['name', '_id']}
   ])
  if (!product) return NextResponse.json({message: "No product found"}, {status: 404});
  return NextResponse.json({product})
}