import {NextRequest, NextResponse} from "next/server";
import Product from "@/models/product";
import connect from "@/db/connect";
import {addImages} from "@/utils/general";
import {cookies} from "next/headers";
import {verifyToken} from "@/utils/verifyToken";
import slugify from "slugify";

export async function POST(req) {
  const cookieID = cookies().get('login_token')
  const {id} = await verifyToken(cookieID.value)
  const data =await req.json()

   await connect()


   const isExist = await Product.findOne({name: data.name})
   if (isExist) {
     return NextResponse.json({message: "this name is already exist"}, {status: 400})
   }
  const slug = slugify(`${data.name}` ,"_").trim()
  const list  =  data.price.map(x=>x)
   const newProduct = {
     name: data.name,
     description: data.description,
     slug,
     price: list,
     show: data.show,
     brand: data.brand,
     category: data.category,
     image: {
       scr: data.image,
       id :''
     },
     createdBy:id
   }
   const product = await Product.insertMany(newProduct)
  return NextResponse.json( { message: "successfully added new product" } )
}