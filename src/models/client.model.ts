import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";

export class Client extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public address!: string;
  public phone!: string;
  public country!: string;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
