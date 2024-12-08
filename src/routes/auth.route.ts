// src/routes/auth.route.ts
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { registerValidator } from "../validator/register.validator";
import { handleValidations } from "../middleware/handleValidations.middleware";

const authRoute = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRoute.post(
  "/register", 
  registerValidator,
  handleValidations,
  asyncHandler(authController.register)
);
authRoute.post("/login", asyncHandler(authController.login));
authRoute.post("/logout", asyncHandler(authController.logout));
authRoute.get("/verify", asyncHandler(authController.verifyToken));
authRoute.post("/refresh-token", asyncHandler(authController.refreshToken));

export default authRoute;
