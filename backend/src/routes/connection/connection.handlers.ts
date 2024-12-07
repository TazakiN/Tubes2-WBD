import { Context } from "hono";
import { getUserIDbyTokenInCookie } from "../../utils/jwt";
import { ConnectionService } from "../../services/connection.service";

export const getAllConnection = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));

  try {
    const connect = await ConnectionService.getAllConnection(user_id);

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

export const deleteConnection = async (c: Context) => {
  const user_id = BigInt(await getUserIDbyTokenInCookie(c));
  const { to_id } = await c.req.json();

  try {
    const connection = await ConnectionService.deleteConnection(user_id, to_id);

    return c.json(
      {
        success: true,
        message: "Success delete connection",
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

export const getAllConnectionInfo = async (c: Context) => {
  try {
    const requesting_id = BigInt(await getUserIDbyTokenInCookie(c));
    let user_id_bigint = requesting_id;

    let user_id = c.req.query("user_id");
    if (user_id) {
      user_id_bigint = BigInt(user_id);
    }

    const connectionsInfo = await ConnectionService.getAllConnectionInfo(
      user_id_bigint
    );

    return c.json(
      {
        success: true,
        message: "Success get all connection info",
        from_user: requesting_id === user_id_bigint,
        data: connectionsInfo,
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
