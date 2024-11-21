import jwt from "jsonwebtoken";

export function signJWT(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}
