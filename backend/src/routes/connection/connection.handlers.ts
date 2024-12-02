import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ConnectService } from "../../services/connection.service";

export const getAllConnection = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));

  try {
    const connect = await ConnectService.getAllConnection(user_id);

    return c.json(
      {
        success: true,
        message: "Success get all connect",
        data: connect,
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
