import User from "../../models/user.model";
import { ApiResponse, DecodedToken } from "./common.interface";

export interface AuthServiceInterface {
  register(
    username: string,
    password: string,
    email: string
  ): Promise<ApiResponse>;
  login(username: string, password: string): Promise<ApiResponse>;
  logout(token: string): Promise<ApiResponse>;
  validateToken(token: string): Promise<DecodedToken | undefined>;
  generateAccessToken(user: Partial<User>): string;
  generateRefreshToken(user: Partial<User>): string;
  refreshToken(refreshToken: string): Promise<ApiResponse>;
  decodeRefreshToken(refreshToken: string): Partial<DecodedToken>;
}