import { Invoice } from "./../models/invoice.model";
import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
import { setAuthorization } from "../middleware/authorize.middleware";
import { AccessLevel, ModelType } from "../types/enums/common.enum";
import expressAsyncHandler from "express-async-handler";
import { InvoiceService } from "../services/invoice.service";
import { InvoiceController } from "../controllers/Invoice.controller";
import { invoiceValidator } from "../validator/invoice.validator";
import { handleValidations } from "../middleware/handleValidations.middleware";

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

// create new invoice

invoiceRoute.post(
  "/:id",
  authenticateToken,
  invoiceValidator,
  handleValidations,
  setAuthorization(ModelType.USER, AccessLevel.OWNER_ONLY),
  expressAsyncHandler((req, res) => invoiceController.createInvoice(req, res))
);

// update invoice
invoiceRoute.put(
  "/:id",
  authenticateToken,
  invoiceValidator,
  handleValidations,
  setAuthorization(ModelType.INVOICE, AccessLevel.OWNER_ONLY),
  expressAsyncHandler((req, res) => invoiceController.updateInvoice(req, res))
);

// delete invoice

invoiceRoute.delete(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.INVOICE, AccessLevel.OWNER_ONLY),
  expressAsyncHandler((req, res) => invoiceController.deleteInvoice(req, res))
);
