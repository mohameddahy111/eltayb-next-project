import Address from "@/models/address";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connect from "@/db/connect";

export async function POST(req) {
  await connect();
  const data = await req.json();
  const cookie = cookies().get("login_token");
  const { id } = await verifyToken(cookie.value);
  const haveAddress = await Address.findOne({ userId: id });
  if (haveAddress) {
    haveAddress.address.push(data);
    await haveAddress.save();
    cookies().set("address", JSON.stringify(haveAddress));
    return NextResponse.json(
      { message: "success Add new address" },
      { status: 200 }
    );
  } else {
    const newAderess = {
      userId: id,
      address: data
    };

    await Address.insertMany(newAderess);
    const allAdderss = await Address.findOne({ userId: id });
    cookies().set("address", JSON.stringify(allAdderss));
    return NextResponse.json(
      { message: "success add new address" },
      { status: 200 }
    );
  }
}
export async function PUT(req) {
  await connect();
  const { values, addressId } = await req.json();
  const cookie = cookies().get("login_token");
  const { id } = await verifyToken(cookie.value);
  const haveAddress = await Address.findOne({ userId: id });
  const sameAddress = haveAddress.address.find((ele) => ele._id == addressId);
  if (!sameAddress) {
    return NextResponse.json({ message: "cant find address" }, { status: 404 });
  }
  Object.keys(values).map((key) => {
    sameAddress[key] = values[key];
  });
  await haveAddress.save();
  const allAdderss = await Address.findOne({ userId: id });
  cookies().set("address", JSON.stringify(allAdderss));
  return NextResponse.json(
    { message: " Address has been modified" },
    { status: 200 }
  );
}
