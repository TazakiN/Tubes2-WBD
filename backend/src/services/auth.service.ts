import bcrypt from "bcrypt";
import db from "../config/db";
import { signJWT, verifyJWT } from "../utils/jwt";
import { Prisma } from "@prisma/client";

export default class AuthService {
  static async register(
    username: string,
    email: string,
    password: string,
    full_name: string
  ) {
    try {
      const hashedPassword = (await bcrypt.hash(password, 10)) as string;
      const defaultPP = "uploads/default.jpg";

      const user = await db.users.create({
        data: {
          username,
          email,
          password_hash: hashedPassword,
          full_name,
          created_at: new Date(),
          updated_at: new Date(),
          profile_photo_path: defaultPP,
        },
      });

      const token = signJWT({
        id: user.id.toString(),
        email: user.email,
        role: "job_seeker",
      });
      return token;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error("Username or Email already exists");
      }
      throw new Error("An unexpected error occurred during registration");
    }
  }

  static async login(identifier: string, password: string) {
    try {
      const user = await db.users.findFirst({
        where: {
          OR: [{ username: identifier }, { email: identifier }],
        },
      });

      if (!user) {
        throw new Error("Identifiers or password is incorrect");
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
      );
      if (!isPasswordValid) {
        throw new Error("Identifiers or password is incorrect");
      }

      const token = await signJWT({
        id: user.id.toString(),
        email: user.email,
        role: "job_seeker",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}
