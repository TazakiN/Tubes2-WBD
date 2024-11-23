import { Hono } from "hono";
import { authRoutes } from "./routes/auth.routes";
import { profileRoutes } from "./routes/profile.routes";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";

dotenv.config();
const base = new Hono();

const app = new Hono();
const port: number = Number(process.env.PORT);

app.route("/", authRoutes);
app.route("/profile", profileRoutes);

base.use(logger());
base.route("/api", app);

serve({ fetch: base.fetch, port: port });
