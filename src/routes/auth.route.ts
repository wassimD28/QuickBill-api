import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { registerValidator } from "../validator/register.validator";
import { handleValidations } from "../middleware/handleValidations.middleware";
import { loginValidator } from "../validator/login.validator";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
import { accessTokenValidator } from "../validator/token.validator";
import { validateLogoutRequest } from "../middleware/validateLogoutRequest .middleware";
import expressAsyncHandler from "express-async-handler";

const authRoute = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// Wrap each route handler
authRoute.post(
  "/register",
  registerValidator,
  handleValidations,
  expressAsyncHandler(authController.register)
);

authRoute.post(
  "/login",
  loginValidator,
  handleValidations,
  expressAsyncHandler(authController.login)
);

authRoute.post(
  "/logout",
  authenticateToken,
  accessTokenValidator,
  handleValidations,
  validateLogoutRequest,
  expressAsyncHandler(authController.logout)
);

authRoute.get("/verify", expressAsyncHandler(authController.verifyToken));

authRoute.post(
  "/refresh-token",
  expressAsyncHandler(authController.refreshToken)
);

export default authRoute;
