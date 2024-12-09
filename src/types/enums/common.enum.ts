// Define who can access the route
export enum AccessLevel {
  OWNER_ONLY = "OWNER_ONLY",
  ADMIN_ONLY = "ADMIN_ONLY",
  OWNER_OR_ADMIN = "OWNER_OR_ADMIN",
}

export enum ModelType {
  INVOICE = "INVOICE",
  PAYMENT_INFO = "PAYMENT_INFO",
  CLIENT = "CLIENT",
  PRODUCT = "PRODUCT",
  LINE_ITEM = "LINE_ITEM",
  REFRESH_TOKEN = "REFRESH_TOKEN",
  USER = "USER",
}