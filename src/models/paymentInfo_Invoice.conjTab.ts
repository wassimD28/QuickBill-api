import { PaymentInfo } from "./paymentInfo.model";
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { Invoice } from "./invoice.model";

export class PaymentInfoInvoice extends Model {
  public paymentInfo_id!: number;
  public invoice_id!: number;
}

PaymentInfoInvoice.init(
  {
    paymentInfo_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: PaymentInfo,
        key: "id",
      },
    },
    invoice_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: Invoice,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "paymentInfo_invoice",
    timestamps: false,
  }
);
