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
            username: {
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
        username: true,
        profile_photo_path: true,
      },
      orderBy: {
        username: "asc",
      },
    });

    return users;
  }
}
