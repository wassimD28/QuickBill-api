import User from "../models/user.model";
import { UserServiceInterface } from "../types/interfaces/userService.interface";

export class UserService implements UserServiceInterface {
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }
  findById(id: number): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  updateProfile(id: number, userData: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
  
  
}
