import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { Invoice } from "./invoice.model";
import User from "./user.model";

export class LineItem extends Model {
  public id!: number;
  public user_id!: number;
  public invoice_id!: number;
  public name!: number;
  public quantity!: number;
  public rate!: number;
  public amount!: number;
  public createdAt!: number;
  public updatedAt!: number;
}
LineItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    invoice_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Invoice,
        key: "id",
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "line_items",
    timestamps: true,
  }
);
