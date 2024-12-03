import db from "../config/db";
import profileService from "./profile.service";

export class ConnectionRequestService {
  static async getConnectionRequest(user_id: bigint, from_id: bigint) {
    const request = await db.connection_request.findFirst({
      where: {
        from_id,
        to_id: user_id,
      },
    });

    if (request) {
      return {
        ...request,
        from_id: request.from_id.toString(),
        to_id: request.to_id.toString(),
      };
    }

    return null;
  }

  private static async isExist(user_id: bigint, to_id: bigint) {
    return await db.connection_request.findFirst({
      where: {
        from_id: user_id,
        to_id,
      },
    });
  }

  static async updateConnectionRequest(
    user_id: bigint,
    from_id: bigint,
    isAccepted: boolean
  ) {
    if (user_id === from_id) {
      throw new Error("You cannot accept your own connection request");
    }

    if (await this.isExist(user_id, from_id)) {
      throw new Error("You have already accepted this connection request");
    }

    await db.connection_request.deleteMany({
      where: {
        from_id,
        to_id: user_id,
      },
    });
    if (isAccepted) {
      try {
        await db.connection.createMany({
          data: [
            {
              from_id: from_id,
              to_id: user_id,
              created_at: new Date(),
            },
            {
              from_id: user_id,
              to_id: from_id,
              created_at: new Date(),
            },
          ],
        });
      } catch (error) {
        throw error;
      }
    }
  }

  static async createConnectionRequest(user_id: bigint, to_id: bigint) {
    if (user_id === to_id) {
      throw new Error("You cannot send a connection request to yourself");
    }

    if (await this.isExist(user_id, to_id)) {
      throw new Error(
        "You have already sent a connection request to this user"
      );
    }

    await db.connection_request.create({
      data: {
        from_id: user_id,
        to_id,
        created_at: new Date(),
      },
    });

    return true;
  }

  static async getAllConnectionRequests(user_id: bigint, type: string) {
    const whereClause =
      type === "Outgoing" ? { from_id: user_id } : { to_id: user_id };
    const connectionRequests = await db.connection_request.findMany({
      where: whereClause,
      orderBy: {
        created_at: "desc",
      },
    });
    try {
      const data = await Promise.all(
        connectionRequests.map(async (request) => {
          const otherUserId =
            type === "Outgoing" ? request.to_id : request.from_id;
          const userInfo = await db.users.findFirst({
            where: {
              id: otherUserId,
            },
            select: {
              username: true,
              full_name: true,
              profile_photo_path: true,
            },
          });

          return {
            user_id: otherUserId.toString(),
            full_name: userInfo?.full_name ?? userInfo!.username,
            profile_photo_path: userInfo!.profile_photo_path,
            created_at: request.created_at,
          };
        })
      );
      return data;
    } catch (error) {
      throw new Error("Failed to get connection requests");
    }
  }
}
