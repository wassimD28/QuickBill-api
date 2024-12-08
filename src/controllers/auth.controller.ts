// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
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
    try {
      const { username, password, email } = req.body;
      const response = await this.authService.register(
        username,
        password,
        email
      );
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username, password } = req.body;
      const response = await this.authService.login(username, password);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token } = req.body;
      const response = await this.authService.logout(token);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ success: false, message: "No token provided" });
        return;
      }
      const response = await this.authService.validateToken(token);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token } = req.body;
      const response = this.authService.refreshToken(token);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
