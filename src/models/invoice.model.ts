import { DataTypes, Model } from "sequelize";
import { LineItem } from "./lineItem.model";
import sequelize from "../config/database.config";
import User from "./user.model";
import { Client } from "./client.model";

export class Invoice extends Model {
  public id!: number;
  public invoiceNumber!: string;
  public user_id!: string;
  public reciver_id!: number;
  public lineItems!: LineItem[];
  public dueDate!: Date;
  public subtotal!: number;
  public total!: number;
  public currency!: string;
  public status!: string; // 'draft', 'sent', 'paid', 'overdue'
  public createdAt!: Date;
  public updatedAt!: Date;
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: { 
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    reciver_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Client,
        key: "id",
      },
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "USD",
    },
    status: {
      type: DataTypes.ENUM("draft", "sent", "paid", "overdue"),
      allowNull: false,
      defaultValue: "draft",
    },
  },
  {
    sequelize,
    tableName: "invoices",
    timestamps: true,
  }
);
