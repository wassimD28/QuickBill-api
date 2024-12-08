import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { DecodedToken } from "../types/interfaces/common.interface";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token missing",
    });
  }
  const authService = new AuthService();
  authService.validateToken(token).then((decoded) => {
    req.auth = decoded.data as DecodedToken;
  });
  next();
}
