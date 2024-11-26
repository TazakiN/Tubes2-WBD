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
