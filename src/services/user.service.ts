import User from "../models/user.model";

export class UserService {
  static async findAll() {
    return User.findAll();
  }

  static async findById(id: number) {
    return User.findByPk(id);
  }
  // temporary :
  static async create(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    return User.create(userData);
  }

  static async update(id: number, userData: Partial<User>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user.update(userData);
  }

  static async delete(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user.destroy();
  }
}
