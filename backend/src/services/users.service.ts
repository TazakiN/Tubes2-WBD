import db from "../config/db";

export class UsersService {
  static async getAllUsers(query: string) {
    const users = await db.users.findMany({
      where: {
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

  static async getUserNameByID(id: bigint) {
    const user = await db.users.findUnique({
      where: {
        id,
      },
      select: {
        full_name: true,
        username: true,
      },
    });

    return user?.full_name || user?.username;
  }
}
