import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
