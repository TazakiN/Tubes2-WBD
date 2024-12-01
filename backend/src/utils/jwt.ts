import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { sign, verify } from "hono/jwt";

export function signJWT(userPayload: any) {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const payload = {
    ...userPayload,
    iat: currentTimeInSeconds,
    exp: currentTimeInSeconds + 60 * 60,
  };
  const secret = process.env.JWT_SECRET!;
  return sign(payload, secret);
}

export function verifyJWT(token: string) {
  const secret = process.env.JWT_SECRET!;
  return verify(token, secret);
}

export async function getUserIDbyTokenInCookie(c: Context) {
  const token = getCookie(c, "token");
  if (!token) {
    throw new Error("Token not found");
  }
  const payload = await verifyJWT(token);
  return (payload as any).id as string;
}
