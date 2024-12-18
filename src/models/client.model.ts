import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import User from "./user.model";

export class Client extends Model {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public email!: string;
  public address!: string;
  public phone!: string;
  public country!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    country: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "clients",
    timestamps: true,
  }
);
