import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { registerValidator } from "../validator/register.validator";
import { handleValidations } from "../middleware/handleValidations.middleware";
import { loginValidator } from "../validator/login.validator";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
import { accessTokenValidator } from "../validator/token.validator";
import {setAuthorization } from "../middleware/authorize.middleware";
import { AccessLevel, ModelType } from "../types/enums/common.enum";
import { validateLogoutRequest } from "../middleware/validateLogoutRequest .middleware";



const authRoute = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// Wrap each route handler
authRoute.post(
  "/register",
  registerValidator,
  handleValidations,
  authController.register
);

authRoute.post(
  "/login",
  loginValidator,
  handleValidations,
  authController.login
);

authRoute.post(
  "/logout",
  authenticateToken,
  accessTokenValidator,
  handleValidations,
  validateLogoutRequest,
  authController.logout
);

authRoute.get(
  "/verify",
  authController.verifyToken
);

authRoute.post(
  "/refresh-token",
  authController.refreshToken
);

export default authRoute;
