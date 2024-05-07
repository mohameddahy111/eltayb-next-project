import { NextResponse } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function middleware(req) {
  // let cookie = req.cookies.get("login_token");
  const cookie = cookies().get("login_token");
  if (!cookie) {
    return NextResponse.json(
      { message: "Invalid login token" },
      { status: 401 }
    );
  }
  const token = await verifyToken(cookie.value);
  const date = Math.floor(Date.now() / 1000);
  if (token === null || jose.errors.JWTExpired === "ERR_JWT_EXPIRED") {
    //TODO: redirected to login page
    return NextResponse.json({ message: "token is expierd" }, { status: 401 });
  }
  if (date > token.exp) {
    return NextResponse.json({ message: "token is expierd" }, { status: 401 });
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/api/user/:path*",
    // "/api/category/categoryCrud/:path*",
    // "/api/products/add_product/:path*",
    "/api/add_to_cart/:path*",
    "/api/add_address/:path*"
  ]
};
