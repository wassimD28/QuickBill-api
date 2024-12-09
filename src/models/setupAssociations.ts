import { Client } from "./client.model";
import { Invoice } from "./invoice.model";
import { LineItem } from "./lineItem.model";
import { LineItemProduct } from "./lineItem_product.conjTab";
import { Product } from "./product.model";
import { PaymentInfo } from "./paymentInfo.model";
import { PaymentInfoInvoice } from "./paymentInfo_Invoice.conjTab";
import { RefreshToken } from "./refreshToken.model";
import User from "./user.model";

export default function setupAssociations(){
  // Define associations
  Invoice.belongsTo(User, { as: "user", foreignKey: "user_id" });
  Invoice.belongsTo(Client, { as: "receiver", foreignKey: "reciver_id" });
  Invoice.hasMany(LineItem, { foreignKey: "invoice_id" });
  LineItem.belongsTo(Invoice, { foreignKey: "invoice_id" });

  // Define product and line item many to many relationship
  LineItem.belongsToMany(Product, { through: LineItemProduct , foreignKey: "product_id" });
  Product.belongsToMany(LineItem, { through: LineItemProduct , foreignKey:  "lineItem_id" });

  // Define paymentInfo and Invoice many to many relationship
  PaymentInfo.belongsToMany(Invoice, { through: PaymentInfoInvoice, foreignKey: "paymentInfo_id" });
  Invoice.belongsToMany(PaymentInfo, { through: PaymentInfoInvoice, foreignKey: "invoice_id" });

  // Define refreshToken and User one to many relationship
  RefreshToken.belongsTo(User, { foreignKey: "user_id" });
  User.hasMany(RefreshToken, { foreignKey: "user_id" });

  // Define user and payment info one to many relationship
  User.hasMany(PaymentInfo, { foreignKey: "user_id" });
  PaymentInfo.belongsTo(User, { foreignKey: "user_id" });

  // Define user and lineItem one to many relationship
  User.hasMany(LineItem, { foreignKey: "user_id" });
  LineItem.belongsTo(User, { foreignKey: "user_id" });

  // Define user and client one to many relationship
  User.hasMany(Client, { foreignKey: "user_id" });
  Client.belongsTo(User, { foreignKey: "user_id" });

  // Difine user and product one to many relationship
  User.hasMany(Product, { foreignKey: "user_id" });
  Product.belongsTo(User, { foreignKey: "user_id" });
}


