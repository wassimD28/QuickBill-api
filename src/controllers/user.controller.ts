import { ApiResponse } from './../types/interfaces/common.interface';
import { Request ,Response} from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService : UserService){}

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const limit = parseInt(req.params.limit as string) || 10;
    const users = await this.userService.findAll(limit);
    let response : ApiResponse;
    response = {
      success: true,
      message: "Users fetched successfully",
      data: users
    }
    res.status(200).json(response);
  }

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id as string);
    const user = await this.userService.findById(userId);
    let response : ApiResponse;
    if(user){
      response = {
        success: true,
        message: "User fetched successfully",
        data: user
      }
    } else {
      response = {
        success: false,
        message: "User not found",
      }
    }
    res.status(200).json(response);
  }

  updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id as string);
    const userData = req.body;
    const updatedUser = await this.userService.updateProfile(userId, userData);
    let response : ApiResponse;
    if(updatedUser){
      response = {
        success: true,
        message: "User profile updated successfully",
        data: updatedUser
      }
    } else {
      response = {
        success: false,
        message: "User not found",
      }
    }
    res.status(200).json(response);
  }

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id as string);
    const deleted = await this.userService.delete(userId);
    let response : ApiResponse;
    if(deleted){
      response = {
        success: true,
        message: "User deleted successfully",
      }
    } else {
      response = {
        success: false,
        message: "User not found",
      }
    }
    res.status(200).json(response);
  }
}