import { PaymentInfo } from "../../models/paymentInfo.model";
import { ApiResponse } from "./common.interface";

export interface IPaymentInfoService {
  getAll(user_id: string): Promise<PaymentInfo[]>;
  getById(id: string): Promise<PaymentInfo | null>;
  create(paymentInfoData: Partial<PaymentInfo>): Promise<PaymentInfo>;
  update(id: string, paymentInfoData: Partial<PaymentInfo>): Promise<PaymentInfo | null>;
  delete(id: string): Promise<boolean>;
  linkWithInvoice(paymentInfo_id: string,invoice_id: string): Promise<ApiResponse>
  unlinkWithInvoice(paymentInfo_id: string, invoice_id: string): Promise<ApiResponse>
  isLinked(paymentInfo_id: string,invoice_id: string): Promise<ApiResponse>
}