import { NextFunction, Request, response, Response } from "express";
import { AuthService } from "../services/auth.service";
import {
  ApiResponse,
  DecodedToken,
  UserIdentity,
} from "../types/interfaces/common.interface";

// Extend Express Request type to include auth property
declare global {
  namespace Express {
    interface Request {
      auth: DecodedToken;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let response: ApiResponse;
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token missing",
      });
      return;
    }

    const authService = new AuthService();
    const result = await authService.validateToken(token);
     
    if (!result) {
      response = {
        success: false,
        message: "Invalid access token",
      };
      res.status(401).json(response);
      return;
    }
    
    req.auth = result as UserIdentity;
    next();
  } catch (error) {
    next(error);
  }
};
