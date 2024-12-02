import db from "../config/db";

export class ConnectService {
  static async getAllConnect(user_id: bigint) {
    const allConnection = await db.connection.findMany({
      where: {
        OR: [
          {
            from_id: user_id,
          },
          {
            to_id: user_id,
          },
        ],
      },
    });

    return allConnection;
  }

  static async createConnect(from_id: bigint, to_id: bigint) {
    const allConnection = await db.connection.create({
      data: {
        from_id,
        to_id,
        created_at: new Date(),
      },
    });

    return allConnection;
  }
}
