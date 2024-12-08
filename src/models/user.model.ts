import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roles!: string[]; // Array of roles
  public address!: string;
  public phone!: string;
  public country!: string;
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
    name: {
      type: DataTypes.STRING,
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
