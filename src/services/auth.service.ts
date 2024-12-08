import { RefreshToken } from "../models/refreshToken.model";
import User from "../models/user.model";
import { AuthServiceInterface } from "../types/interfaces/authService.interface";
import {
  ApiResponse,
  DecodedToken,
} from "../types/interfaces/common.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService implements AuthServiceInterface {
  async login(username: string, password: string): Promise<ApiResponse> {
    let response: ApiResponse;
    try {
      const user = await User.findOne({
        where: { username },
      });
      // check if user exists
      if (!user) {
        return { success: false, message: "User not found." };
      }
      // compare password with hashed password from database
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // generate access token and refresh token
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        // save refresh token to database
        await RefreshToken.create({
          user_id: user.id,
          token: refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        });
        response = {
          success: true,
          message: "Login successful",
          data: {
            user: {
              id: user.id,
              username: user.username,
              roles: user.roles,
            },
            tokens: {
              accessToken,
              refreshToken,
            },
          },
        };
      } else {
        response = {
          success: false,
          message: "Incorrect email or password.",
        };
      }
      return response;
    } catch (error: any) {
      response = {
        success: false,
        message: "An error occurred while logging in",
        error: {
          name: error.name,
          message: error.message,
        },
      };
      return response;
    }
  }
  async logout(refreshToken: string): Promise<ApiResponse> {
    let response: ApiResponse;
    try {
      // check if the refresh token exists
      const refreshTokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken },
      });
      if (!refreshTokenRecord) {
        response = {
          success: false,
          message: "Refresh token not found.",
        };
        return response;
      }
      // delete the refresh token
      await refreshTokenRecord.destroy();
      response = {
        success: true,
        message: "Logged out successfully",
      };
      return response;
    } catch (error: any) {
      response = {
        success: false,
        message: "An error occurred while logging out.",
        error: {
          name: error.name,
          message: error.message,
        },
      };
      return response;
    }
  }
  // check if access token is valid
  async validateToken(token: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      if (!token) {
        resolve({
          success: false,
          message: "Access token missing",
        });
        return;
      }

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
          if (err) {
            if (err instanceof jwt.TokenExpiredError) {
              resolve({
                success: false,
                message: "Access token has expired",
                error: {
                  name: err.name,
                  expiredAt: err.expiredAt,
                },
              });
              return;
            }

            if (err instanceof jwt.JsonWebTokenError) {
              resolve({
                success: false,
                message: "Invalid access token",
                error: {
                  name: err.name,
                },
              });
              return;
            }

            // Handle other potential JWT errors
            resolve({
              success: false,
              message: "Token verification failed",
              error: {
                name: err.name,
                message: err.message,
              },
            });
            return;
          }

          // Token is valid
          resolve({
            success: true,
            message: "Token is valid",
            data: decoded as DecodedToken,
          });
        }
      );
    });
  }
  generateAccessToken(user: Partial<User>): string {
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "30m",
    });
  }
  generateRefreshToken(user: Partial<User>): string {
    const payload = { userId: user.id };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "7d",
    });
  }
  async refreshToken(refreshToken: string): Promise<ApiResponse> {
    let response: ApiResponse;
    try {
      // find the refresh token and store it in variable
      const storedToken = await RefreshToken.findOne({
        where: { token: refreshToken },
      });
      // ensure the refresh token is exists in the database
      if (!storedToken) {
        response = {
          success: false,
          message: "Refresh token not found",
        };
        return response;
      }

      // Check if the token has expired using the expiresAt property
      if (new Date() > storedToken.expiresAt) {
        await storedToken.destroy(); // Remove the expired token
        response = {
          success: false,
          message: "Refresh token has expired",
        };
        return response;
      }
      // check if the user of refresh token exists
      const decoded = this.decodeRefreshToken(refreshToken);
      const user = await User.findOne({ where: { id: decoded.user_id } });
      if (!user) {
        response = {
          success: false,
          message: "User not found",
        };
        return response;
      }

      // Generate new access token
      const accessToken = this.generateAccessToken(user);
      // Implement token rotation: generate a new refresh token
      const newRefreshToken = this.generateRefreshToken(user);

      // Update the stored refresh token
      await storedToken.update({
        token: newRefreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      });

      response = {
        success: true,
        message: "Token refreshed successfully",
        data: {
          user: {
            id: user.id,
            username: user.username,
            roles: user.roles,
          },
          tokens: {
            accessToken,
            refreshToken: newRefreshToken,
          },
        },
      };
      return response;
    } catch (error : any) {
      response = {
        success: false,
        message: "An error occurred while refreshing token",
        error: {
          name: error.name,
          message: error.message,
        },
      }
      return response;
    }
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<ApiResponse> {
    try {
      // Check if user already exists
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        return {
          success: false,
          message: "User already exists with this email",
        };
      }
      // create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return {
        success: true,
        message: "User registered successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  decodeRefreshToken(refreshToken: string): { user_id: number } {
    return jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { user_id: number };
  }
}
