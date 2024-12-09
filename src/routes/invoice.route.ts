import { Invoice } from './../models/invoice.model';
import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
import { setAuthorization } from "../middleware/authorize.middleware";
import { AccessLevel, ModelType } from "../types/enums/common.enum";
import expressAsyncHandler from "express-async-handler";
import { InvoiceService } from "../services/invoice.service";
import { InvoiceController } from "../controllers/Invoice.controller";

export const invoiceRoute = Router();
const invoiceService = new InvoiceService();
const invoiceController = new InvoiceController(invoiceService);

invoiceRoute.get(
  "/all/:id",
  authenticateToken,
  setAuthorization(ModelType.USER, AccessLevel.OWNER_ONLY),
  expressAsyncHandler((req, res) => invoiceController.getAllInvoices(req, res))
);

// get one invoice by id

invoiceRoute.get(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.INVOICE, AccessLevel.OWNER_ONLY),
  expressAsyncHandler((req, res) => invoiceController.getInvoiceById(req, res))
);
