import bcrypt from "bcrypt";
import db from "../config/db";
import { signJWT } from "../utils/signJWT";

export default class AuthService {
  static async register(
    username: string,
    email: string,
    password: string,
    full_name: string
  ) {
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
  }

  static async login(identifier: string, password: string) {
    const user = await db.users.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      throw new Error("Identifiers or password is incorrect");
    }

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
