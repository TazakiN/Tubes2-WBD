import bcrypt from "bcrypt";
import db from "../config/db";
import { signJWT, verifyJWT } from "../utils/jwt";
import { Prisma } from "@prisma/client";

export default class AuthService {
  static async register(
    username: string,
    email: string,
    password: string,
    full_name?: string
  ) {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(username)) {
        throw new Error("Username cannot be an email address");
      }
      const hashedPassword = (await bcrypt.hash(password, 10)) as string;
      const defaultPP =
        "https://utfs.io/f/sSGG1cZ5sLHRjk0AwoMlDzsxaHvRBTV7LNtb8F3CmgidkIj9";

      const userData: Prisma.usersCreateInput = {
        username,
        email,
        password_hash: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
        profile_photo_path: defaultPP,
      };

      if (full_name) {
        userData.full_name = full_name;
      }

      const user = await db.users.create({
        data: userData,
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
      throw error;
    }
  }

  static async login(identifier: string, password: string) {
    try {
      const user = await db.users.findFirst({
        where: {
          OR: [{ username: identifier }, { email: identifier }],
        },
        select: {
          id: true,
          email: true,
          password_hash: true,
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

      console.log(token);

      return token;
    } catch (error) {
      throw error;
    }
  }
}
