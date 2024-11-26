import authRoutes from "./routes/auth/auth.index";
import { profileRoutes } from "./routes/profile.routes";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";

dotenv.config();
const app = new OpenAPIHono();
const port: number = Number(process.env.PORT);

app.use(logger());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 6000,
    credentials: true,
  })
);

app.route("/api/", authRoutes);
app.route("/api/profile", profileRoutes);

// Open API + Swagger UI
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Anjay API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

console.log(`Server is listening on port ${port}`);
serve({ fetch: app.fetch, port: port });
