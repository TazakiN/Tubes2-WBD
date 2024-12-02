import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ConnectionRequestService } from "../../services/connection_request.service";

export const getAllConnectionRequests = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const type = c.req.query("type") ?? "Outgoing";
  console.log("type: ", type);
  try {
    const connectionRequests =
      await ConnectionRequestService.getAllConnectionRequests(user_id, type);

    return c.json({
      success: true,
      message: "Success get all connection requests",
      data: connectionRequests,
    });
  } catch (error) {
    return c.json({
      success: false,
      message: (error as Error).message,
    });
  }
};
