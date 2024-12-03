import db from "../config/db";

export class UsersService {
  static async getAllUsers(user_id: bigint, query: string) {
    const users = await db.users.findMany({
      where: {
        NOT: {
          id: user_id,
        },
        OR: [
          {
            full_name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        full_name: true,
        profile_photo_path: true,
        username: true,
      },
      orderBy: {
        full_name: "asc",
      },
    });

    return users;
  }
}
