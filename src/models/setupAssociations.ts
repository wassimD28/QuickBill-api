import { Client } from "./client.model";
import { Invoice } from "./invoice.model";
import { LineItem } from "./lineItem.model";
import { LineItemProduct } from "./lineItem_product.conjTab";
import { Product } from "./product.model";
import { PaymentInfo } from "./paymentInfo.model";
import { PaymentInfoInvoice } from "./paymentInfo_Invoice.conjTab";
import User from "./user.model";

export default function setupAssociations(){
  // Define associations
  Invoice.belongsTo(User, { as: "sender", foreignKey: "sender_id" });
  Invoice.belongsTo(Client, { as: "receiver", foreignKey: "reciver_id" });
  Invoice.hasMany(LineItem, { foreignKey: "invoice_id" });
  LineItem.belongsTo(Invoice, { foreignKey: "invoice_id" });

  // Define product and line item many to many relationship
  LineItem.belongsToMany(Product, { through: LineItemProduct , foreignKey: "product_id" });
  Product.belongsToMany(LineItem, { through: LineItemProduct , foreignKey:  "lineItem_id" });

  // Define paymentInfo and Invoice many to many relationship
  PaymentInfo.belongsToMany(Invoice, { through: PaymentInfoInvoice, foreignKey: "paymentInfo_id" });
  Invoice.belongsToMany(PaymentInfo, { through: PaymentInfoInvoice, foreignKey: "invoice_id" });
}


