import db from "../config/db";

export class ConnectionService {
  static async getStatus(user_id1: bigint, user_id2: bigint) {
    const [connection, connectionRequest, connectionRequest2] =
      await Promise.all([
        db.connection.findFirst({
          where: {
            OR: [
              { from_id: user_id1, to_id: user_id2 },
              { from_id: user_id2, to_id: user_id1 },
            ],
          },
        }),
        db.connection_request.findFirst({
          where: { from_id: user_id1, to_id: user_id2 },
        }),
        db.connection_request.findFirst({
          where: { from_id: user_id2, to_id: user_id1 },
        }),
      ]);

    if (connection) {
      return "Connected";
    }

    if (connectionRequest) {
      return "Outgoing";
    }

    if (connectionRequest2) {
      return "Incoming";
    }

    return "Not Connected";
  }

  static async getAllConnection(user_id: bigint) {
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

  static async isConnected(from_id: bigint, to_id: bigint) {
    const connection = await db.connection.findFirst({
      where: {
        from_id,
        to_id,
      },
    });

    return connection;
  }
}