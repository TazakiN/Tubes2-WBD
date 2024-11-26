import AuthService from "../services/auth.service";

export class AuthController {
  static async register(
    username: string,
    email: string,
    password: string,
    name: string
  ) {
    try {
      return await AuthService.register(username, email, password, name);
    } catch (error) {
      throw error;
    }
  }

  static async login(identifier: string, password: string) {
    try {
      return await AuthService.login(identifier, password);
    } catch (error) {
      throw error;
    }
  }
}
