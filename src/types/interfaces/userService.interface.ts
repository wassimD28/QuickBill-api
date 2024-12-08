import User from "../../models/user.model";

export interface UserServiceInterface {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  updateProfile(id: number, userData: Partial<User>): Promise<User>;
  delete(id: number): Promise<boolean>;
}
