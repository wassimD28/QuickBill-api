import { Router } from "express";
import { PaymentInfoService } from "../services/paymentInfo.service";
import { PaymentInfoController } from "../controllers/paymentInfo.controller";
import expressAsyncHandler from "express-async-handler";
import { authenticateToken } from "../middleware/authenticateToken.middleware";
import { setAuthorization } from "../middleware/authorize.middleware";
import { AccessLevel, ModelType } from "../types/enums/common.enum";

const paymentInfoRoute = Router();
const paymentInfoService = new PaymentInfoService();
const paymentInfoController = new PaymentInfoController(paymentInfoService);

// get all payment info via user id

paymentInfoRoute.get(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.USER, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.getALLPaymentInfoByUserId)
);

// get payment info by id

paymentInfoRoute.get(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.PAYMENT_INFO, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.getPaymentInfoById)
);

// create payment info (id : is user_id to secure the authorization)
paymentInfoRoute.post(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.USER, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.createPaymentInfo)
);

// update payment info
paymentInfoRoute.put(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.PAYMENT_INFO, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.updatePaymentInfo)
);

// delete payment info

paymentInfoRoute.delete(
  "/:id",
  authenticateToken,
  setAuthorization(ModelType.PAYMENT_INFO, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.deletePaymentInfo)
);

// link payment info with invoice
paymentInfoRoute.put(
  "/link/:id/invoice/:invoice_id",
  authenticateToken,
  setAuthorization(ModelType.PAYMENT_INFO, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.linkWithInvoice)
);

// unlink payment info with invoice

paymentInfoRoute.put(
  "/unlink/:id/invoice/:invoice_id",
  authenticateToken,
  setAuthorization(ModelType.PAYMENT_INFO, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.unlinkWithInvoice)
);

// check if payment info is linked with invoice
paymentInfoRoute.get(
  "/is-linked/:id/invoice/:invoice_id",
  authenticateToken,
  setAuthorization(ModelType.PAYMENT_INFO, AccessLevel.OWNER_ONLY),
  expressAsyncHandler(paymentInfoController.isLinkedWithInvoice)
);