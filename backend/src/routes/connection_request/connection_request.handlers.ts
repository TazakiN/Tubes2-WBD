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

export const createConnectionRequest = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const { to_id } = await c.req.json();

  try {
    await ConnectionRequestService.createConnectionRequest(user_id, to_id);

    return c.json({
      success: true,
      message: "Success create connection request",
    });
  } catch (error) {
    return c.json({
      success: false,
      message: (error as Error).message,
    });
  }
};
