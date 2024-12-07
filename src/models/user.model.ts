import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public roles!: string[]; // Array of roles
  public createdAt!: Date;
  public updatedAt!: Date; 
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // PostgreSQL supports `SERIAL`, but this is compatible
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true, // PostgreSQL supports email validation indirectly through Sequelize
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL array type
      allowNull: false,
      defaultValue: ["USER"], // Default role
      validate: {
        isValidRole(value: string[]) {
          const validRoles = ["ADMIN", "USER" ];
          value.forEach((role) => {
            if (!validRoles.includes(role)) {
              throw new Error(`Invalid role: ${role}`);
            }
          });
        },
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true, // Adds `createdAt` and `updatedAt` automatically
  }
);

export default User;
