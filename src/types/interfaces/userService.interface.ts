import User from "../../models/user.model";

export interface UserServiceInterface {
  // Get all users
  findAll(): Promise<User[]>;
  // Get user by id
  findById(id: number): Promise<User | null>;
  // update user profile
  updateProfile(id: number, userData: Partial<User>): Promise<User | null>;
  // Delete user by id
  delete(id: number): Promise<boolean>;
}
