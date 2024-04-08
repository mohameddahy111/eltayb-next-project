import {SignJWT, jwtVerify , errors} from "jose";
// import * as jose from "jose";

const secret = process.env.Token;
export const getToken = async (info) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60; // one hour
  return new SignJWT({...info})
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
};

export const verifyToken = async (token) => {
  const {payload}  = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
};
