import { response } from 'express';
import { PaymentInfo } from "../models/paymentInfo.model";
import { IPaymentInfoService } from "../types/interfaces/paymentInfoService.interface";
import { PaymentInfoInvoice } from "../models/paymentInfo_Invoice.conjTab";
import { ApiResponse } from "../types/interfaces/common.interface";

export class PaymentInfoService implements IPaymentInfoService {
  async linkWithInvoice(paymentInfo_id: string, invoice_id: string): Promise<ApiResponse> {
    const paymentInfoInvoice = await PaymentInfoInvoice.findOne({
      where: { paymentInfo_id, invoice_id },
    });
    let response : ApiResponse;
    // check if the payment info and the invoice are already linked
    if (paymentInfoInvoice) {
      response = {
        success: false,
        message: "Payment info and invoice are already linked",
      };
      return response;
    }
    // link the payment info and the invoice
    await PaymentInfoInvoice.create({ paymentInfo_id, invoice_id });
    response = {
      success: true,
      message: "Payment info and invoice linked successfully",
    };
    return response;
  }

  async unlinkWithInvoice(paymentInfo_id: string, invoice_id: string): Promise<ApiResponse> {
    const paymentInfoInvoice = await PaymentInfoInvoice.findOne({
      where: { paymentInfo_id, invoice_id },
    });
    let response : ApiResponse;
    // check if the payment info and the invoice are linked
    if (!paymentInfoInvoice) {
      response = {
        success: false,
        message: "Payment info and invoice are not linked",
      };
      return response;
    }
    // unlink the payment info and the invoice
    await paymentInfoInvoice.destroy();
    response = {
      success: true,
      message: "Payment info and invoice unlinked successfully",
    };
    return response;
  }
  async isLinked(paymentInfo_id: string, invoice_id: string): Promise<ApiResponse> {
    const paymentInfoInvoice = await PaymentInfoInvoice.findOne({
      where: { paymentInfo_id, invoice_id },
    });
    let response : ApiResponse;
    if (paymentInfoInvoice) {
      response = {
        success: true,
        message: "Payment info and invoice are linked",
      };
    } else {
      response = {
        success: false,
        message: "Payment info and invoice are not linked",
      };
    }
    return response;
  }
  async delete(id: string): Promise<boolean> {
    const paymentInfo = await PaymentInfo.findByPk(id);
    if (paymentInfo) {
      await paymentInfo.destroy();
      return true;
    }
    return false;
  }
  async getAll(user_id: string): Promise<PaymentInfo[]> {
    return await PaymentInfo.findAll({ where: { user_id } });
  }
  async getById(id: string): Promise<PaymentInfo | null> {
    return await PaymentInfo.findByPk(id);
  }
  async create(paymentInfoData: Partial<PaymentInfo>): Promise<PaymentInfo> {
    return await PaymentInfo.create(paymentInfoData);
  }
  async update(
    id: string,
    paymentInfoData: Partial<PaymentInfo>
  ): Promise<PaymentInfo | null> {
    const paymentInfo = await PaymentInfo.findByPk(id);
    if (paymentInfo) {
      await paymentInfo.update(paymentInfoData);
      return paymentInfo;
    }
    return null;
  }
}
