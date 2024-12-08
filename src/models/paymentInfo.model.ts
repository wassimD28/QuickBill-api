import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export class PaymentInfo extends Model {
  public id!: number;
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
