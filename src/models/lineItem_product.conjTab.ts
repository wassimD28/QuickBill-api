import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { LineItem } from "./lineItem.model";
import { Product } from "./product.model";

export class LineItemProduct extends Model {
  public lineItem_id!: number;
  public product_id!: number;
}

LineItemProduct.init(
  {
    lineItem_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: LineItem,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "lineItem_product",
    timestamps: false,
  }
);
