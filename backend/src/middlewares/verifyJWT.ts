import { Context, Next } from "hono";
import { jwt } from "hono/jwt";

export default function verifyJWT(c: Context, next: Next) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not found in .env file");
  }
  const jwtMiddleware = jwt({
    secret,
    cookie: "token",
  });
  return jwtMiddleware(c, next);
}
