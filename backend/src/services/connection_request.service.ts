import db from "../config/db";
import profileService from "./profile.service";

export class ConnectionRequestService {
  static async updateConnectionRequest(
    user_id: bigint,
    from_id: bigint,
    isAccepted: boolean
  ) {
    await db.connection_request.deleteMany({
      where: {
        from_id,
        to_id: user_id,
      },
    });
    console.log("hai");
    if (isAccepted) {
      try {
        console.log("Creating connection...");
        await db.connection.create({
          data: {
            from_id: from_id,
            to_id: user_id,
            created_at: new Date(),
          },
        });
        console.log("Connection created successfully.");
      } catch (error) {
        console.error("Error creating connection:", error);
        throw error;
      }
    }
  }

  static async createConnectionRequest(user_id: bigint, to_id: bigint) {
    if (user_id === to_id) {
      throw new Error("You cannot send a connection request to yourself");
    }

    const existingRequest = await db.connection_request.findFirst({
      where: {
        from_id: user_id,
        to_id,
      },
    });

    if (existingRequest) {
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
          const userInfo = await profileService.getProfileInfo(otherUserId);

          return {
            user_id: otherUserId.toString(),
            username: userInfo!.username,
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
