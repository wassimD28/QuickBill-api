import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../types/interfaces/common.interface";
import { AuthService } from "../services/auth.service";

export const validateLogoutRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: ApiResponse;
  const authService = new AuthService();
  try {
    const refreshToken = req.body.refreshToken;
    // decode the refresh token
    const decodedRefreshToken = authService.decodeRefreshToken(refreshToken);
    // check if the authenticated user is the owner of the refresh token
    const authenticatedUser = req.auth;
    if (authenticatedUser.user_id !== decodedRefreshToken.user_id) {
      console.log(`authenticatedUser: ${authenticatedUser.user_id}`);
      console.log(`decodede token: ${JSON.stringify(decodedRefreshToken)}`);
      response = {
        success: false,
        message: "Unauthorized to logout",
      };
      res.status(401).json(response);
      return;
    }
    next();
  } catch (error: any) {
    // Handle specific token validation errors
    if (error.name === "TokenExpiredError") {
      response = {
        success: false,
        message: "Refresh token has expired",
      };
      res.status(401).json(response);
      return;
    }

    if (error.name === "JsonWebTokenError") {
      response = {
        success: false,
        message: "Invalid refresh token",
      };
      res.status(401).json(response);
      return;
    }

    // Handle unexpected errors
    response = {
      success: false,
      message: "Failed to process logout request",
      error: {
        name: error.name,
        message: error.message,
      },
    };
    res.status(500).json(response);
    return;
  }
};
