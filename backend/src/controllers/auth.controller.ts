import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Username, email, and password are required",
        });
      }

      const newUser = await AuthService.register(username, email, password);
      return res.status(201).json({
        success: true,
        message: "Register successful",
        body: {
          token: newUser,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        return res
          .status(400)
          .json({ message: "Identifier and password are required" });
      }

      const token = await AuthService.login(identifier, password);
      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(401).json({ message: (error as Error).message });
    }
  }
}
