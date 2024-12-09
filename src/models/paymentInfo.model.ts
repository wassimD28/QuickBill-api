import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.config";
import User from "./user.model";

export class PaymentInfo extends Model {
  public id!: number;
  public user_id!: number;
  public accountName!: string;
  public bankName!: string;
  public accountNumber!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

PaymentInfo.init(
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
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "paymentInfos",
    timestamps: true,
  }
);
