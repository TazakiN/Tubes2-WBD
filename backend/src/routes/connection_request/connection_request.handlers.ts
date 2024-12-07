import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ConnectionRequestService } from "../../services/connection_request.service";

export const getAllConnectionRequests = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const type = c.req.query("type") ?? "Outgoing";
  try {
    const connectionRequests =
      await ConnectionRequestService.getAllConnectionRequests(user_id, type);

    return c.json(
      {
        success: true,
        message: "Success get all connection requests",
        data: connectionRequests,
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

export const getConnectionRequest = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const { from_id } = await c.req.json();

  try {
    const connectionRequest =
      await ConnectionRequestService.getConnectionRequest(user_id, from_id);

    if (!connectionRequest) {
      throw new Error("Connection request not found");
    }

    return c.json(
      {
        success: true,
        message: "Success get connection request",
        data: connectionRequest,
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

export const createConnectionRequest = async (c: Context) => {
  let user_id: string | null = null;
  try {
    user_id = await getUserIDbyTokenInCookie(c);
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Login first to Connect with others",
      },
      401
    );
  }

  const user_id_bigint = BigInt(user_id);
  const { to_id } = await c.req.json();

  try {
    await ConnectionRequestService.createConnectionRequest(
      user_id_bigint,
      to_id
    );

    return c.json(
      {
        success: true,
        message: "Success create connection request",
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

export const cancelConnectionRequest = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const { to_id } = await c.req.json();

  try {
    await ConnectionRequestService.cancelConnectionRequest(
      user_id,
      BigInt(to_id)
    );

    return c.json(
      {
        success: true,
        message: "Success cancel connection request",
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

export const acceptConnectionRequest = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const { from_id } = await c.req.json();

  try {
    await ConnectionRequestService.updateConnectionRequest(
      user_id,
      BigInt(from_id),
      true
    );

    return c.json(
      {
        success: true,
        message: "Success accept connection request",
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

export const rejectConnectionRequest = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const { from_id } = await c.req.json();

  try {
    await ConnectionRequestService.updateConnectionRequest(
      user_id,
      from_id,
      false
    );

    return c.json(
      {
        success: true,
        message: "Success delete connection request",
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
