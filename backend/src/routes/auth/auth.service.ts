import db from "../../db/db";
import { users } from "@prisma/client";

export async function findUserByEmail(email: string): Promise<users | null> {
  return await db.users.findUnique({
    where: {
      email: email,
    },
  });
}
