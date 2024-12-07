import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { createNodeWebSocket } from "@hono/node-ws";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { websocketHandler } from "./utils/ws";

import authRoutes from "./routes/auth/auth.index";
import profileRouter from "./routes/profile/profile.index";
import chatRouter from "./routes/chat/chat.index";
import connectionRequestRouter from "./routes/connection_request/connection_request.index";
import usersRouter from "./routes/users/users.index";
import connectionRouter from "./routes/connection/connection.index";
import feedsRouter from "./routes/feed/feed.index";

dotenv.config();
const app = new OpenAPIHono();
const port: number = Number(process.env.PORT);

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({
  app: app as Hono,
});
export { upgradeWebSocket };

app.use(logger());

app.use(
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 6000,
    credentials: true,
  })
);

app.route("/api/", authRoutes);
app.route("/api/profile", profileRouter);
app.route("/api/chat", chatRouter);
app.route("/api/connection_request", connectionRequestRouter);
app.route("/api/connection", connectionRouter);
app.route("/api/users", usersRouter);
app.route("/api/feed", feedsRouter);

// Open API + Swagger UI
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Anjay API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.get("/ws", websocketHandler());

console.log(`Server is listening on port ${port}`);
const server = serve({ fetch: app.fetch, port: port });
injectWebSocket(server);
