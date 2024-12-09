import { Request, Response, NextFunction } from "express";
import { AuthControllerInterface } from "../types/interfaces/authController.interface";
import { ApiResponse } from "../types/interfaces/common.interface";
import { AuthService } from "../services/auth.service";

export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthService) {}

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, password, email } = req.body;
    const response = await this.authService.register(username, password, email);
    res.status(201).json(response);
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, password } = req.body;
    const response = await this.authService.login(username, password);
    res.status(200).json(response);
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const refreshToken = req.body.refreshToken;
    const response = await this.authService.logout(refreshToken);
    res.status(200).json(response);
  };

  verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }
    const response = await this.authService.validateToken(token);
    res.status(200).json(response);
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { token } = req.body;
    const response = await this.authService.refreshToken(token);
    res.status(200).json(response);
  };
}
