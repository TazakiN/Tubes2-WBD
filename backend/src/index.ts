import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { swaggerUI } from "@hono/swagger-ui";
import { createNodeWebSocket } from "@hono/node-ws";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Context, Hono } from "hono";
import { websocketHandler } from "./utils/ws";

import authRoutes from "./routes/auth/auth.index";
import profileRouter from "./routes/profile/profile.index";
import chatRouter from "./routes/chat/chat.index";
import connectionRequestRouter from "./routes/connection_request/connection_request.index";
import usersRouter from "./routes/users/users.index";
import connectionRouter from "./routes/connection/connection.index";
import feedsRouter from "./routes/feed/feed.index";
import { cacheMiddleware } from "./middlewares/cacheMiddleware";

import { rateLimiter } from "hono-rate-limiter";

dotenv.config();
const app = new OpenAPIHono();
const port: number = Number(process.env.PORT);

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({
  app: app as Hono,
});
export { upgradeWebSocket };

app.use(logger());
// Apply the rate limiting middleware to all requests.
app.use(
  rateLimiter({
    windowMs: 3 * 1000, // 10 seconds
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
    // store: "memory", // Store the rate limit data in memory.
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 6000,
    credentials: true,
  })
);

app.use("/api/*", cacheMiddleware(300000));

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

app.get("/health", (c: Context) => {
  return c.json({ status: "ok" });
});

console.log(`Server is listening on port ${port}`);
const server = serve({ fetch: app.fetch, port: port });
injectWebSocket(server);
