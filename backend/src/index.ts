import { Hono } from "hono";
import { authRoutes } from "./routes/auth.routes";
import { profileRoutes } from "./routes/profile.routes";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

dotenv.config();
const base = new Hono();
const app = new Hono();

const port: number = Number(process.env.PORT);

app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 6000,
    credentials: true,
  })
);

app.route("/", authRoutes);
app.route("/profile", profileRoutes);

base.use(logger());
base.route("/api", app);

console.log(`Server is listening on port ${port}`);
serve({ fetch: base.fetch, port: port });
