import Address from "@/models/address";
import { verifyToken } from "@/utils/verifyToken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connect from "@/db/connect";

export async function DELETE(req, { params }) {
  await connect();
  const { deleteItem } = params;
  const cookie = cookies().get("login_token");
  const { id } = await verifyToken(cookie.value);
  const haveAddress = await Address.findOne({ userId: id });
  const removeList = haveAddress.address.filter((ele) => ele._id != deleteItem);
  haveAddress.address = removeList;
  await haveAddress.save();
  const allAdderss = await Address.findOne({ userId: id });
  if (removeList.length == 0) {
    cookies().delete("address");
    return NextResponse.json(
      { message: " Address has been Deleteed" },
      { status: 200 }
    );
  }
  cookies().set("address", JSON.stringify(allAdderss));

  return NextResponse.json(
    { message: " Address has been Deleteed" },
    { status: 200 }
  );
}
