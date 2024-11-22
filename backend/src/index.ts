import { Hono } from "hono";
import { authRoutes } from "./routes/auth.routes";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";

const app = new Hono();
dotenv.config();
const port: number = Number(process.env.PORT);

app.route("/api", authRoutes);

serve({ fetch: app.fetch, port: port });
