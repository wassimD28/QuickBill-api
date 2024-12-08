import User from "../models/user.model";
import { UserServiceInterface } from "../types/interfaces/userService.interface";

export class UserService implements UserServiceInterface {
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
  async updateProfile(id: number, userData: Partial<User>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(userData);
      return user;
    }
    return null;
  }
  async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
  
  
  
}
