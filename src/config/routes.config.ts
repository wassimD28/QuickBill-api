// src/config/routes.config.ts
import { Express } from "express";
import authRoute from "../routes/auth.route";
import { invoiceRoute } from "../routes/invoice.route";

export class RouteConfig {
  static configure(app: Express): void {
    // Configure routes
    app.use("/api/auth", authRoute);
    app.use("/api/invoice" , invoiceRoute)
  }
}
