import express, { Express, Request, Response } from "express";
// import cors from "cors";
import dotenv from "dotenv";
import { authRoutes } from "./routes/auth/auth.routes";

dotenv.config();

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
