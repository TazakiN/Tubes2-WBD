import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db";
import { User } from "../models/users";
import { signJWT } from "../utils/signJWT";

export class AuthService {
  static async register(username: string, email: string, password: string) {
    const hashedPassword = (await bcrypt.hash(password, 10)) as string;

    const user = await db.users.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    const token = signJWT({
      id: user.id.toString(),
      email: user.email,
      role: "job_seeker",
    });

    return token;
  }

  static async login(identifier: string, password: string) {
    const userPrisma = await db.users.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!userPrisma) {
      throw new Error("Identifiers or password is incorrect");
    }

    const user = User.fromPrisma(userPrisma);

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("Identifiers or password is incorrect");
    }

    const token = signJWT({
      id: user.id.toString(),
      email: user.email,
      role: "job_seeker",
    });

    return token;
  }
}
