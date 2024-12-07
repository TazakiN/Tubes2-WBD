import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { UsersService } from "../../services/users.service";
import { ConnectionService } from "../../services/connection.service";

export const getAllUsers = async (c: Context) => {
  try {
    const user_id = BigInt(await getUserIDbyTokenInCookie(c));
    const query = c.req.query("query") ?? "";

    let data = await UsersService.getAllUsers(query);

    if (user_id) {
      data = data.filter((user: { id: bigint }) => user.id !== user_id);
    }
    const modifiedData = await Promise.all(
      data.map(
        async (user: {
          id: bigint;
          username: string;
          full_name: string | null;
          profile_photo_path: string;
        }) => {
          const status = await ConnectionService.getStatus(user_id, user.id);
          return {
            user_id: user.id.toString(),
            full_name: user.full_name ?? user.username,
            profile_photo_path: user.profile_photo_path,
            status: status as
              | "Connected"
              | "Not Connected"
              | "Outgoing"
              | "Incoming",
          };
        }
      )
    );

    return c.json(
      {
        success: true,
        message: "Success get all users",
        user_count: modifiedData.length,
        data: modifiedData,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: (error as Error).message,
      },
      500
    );
  }
};
