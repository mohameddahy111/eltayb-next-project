import Product from "@/models/product";
import {NextResponse} from "next/server";
import connect from "@/db/connect";

export  async function GET(){
 await connect()
  const products = await Product.find().select({name:1 , image :1 ,slug :1 });
  return NextResponse.json(products)
}
export  async function POST(req){
  await connect()
  const data = await req.json()
  
  const sameProduct = await Product.find({brand:data.brand_id})
  if(sameProduct){
    return NextResponse.json({sameProduct})
  }
}

