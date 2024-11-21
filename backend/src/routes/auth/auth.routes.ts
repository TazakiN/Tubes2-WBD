import express, { Request, Response } from "express";

export const authRoutes = express.Router();

interface LoginRequestBody {
  identifier: string;
  password: string;
}

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

authRoutes.post("/login", (req: Request, res: Response) => {
  //api/login POST
  const { identifier, password } = req.body as LoginRequestBody;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Identifiers and password are required" });
  }

  return res.status(200).json({ message: "login successful" });
});

authRoutes.post("/register", (req: Request, res: Response) => {
  const { username, email, password } = req.body as RegisterRequestBody;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email and password are required" });
  }

  return res.status(200).json({ message: "register successful" });
});
