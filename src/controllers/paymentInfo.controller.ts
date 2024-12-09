import { Request, Response } from "express";
import { PaymentInfoService } from "../services/paymentInfo.service";
import { ApiResponse } from "../types/interfaces/common.interface";

export class PaymentInfoController {
  constructor(private paymentInfoService: PaymentInfoService) {}
  // Implement CRUD operations here
  async getALLPaymentInfoByUserId(req: Request, res: Response): Promise<void> {
    const userId = req.params.user_id;
    const paymentInfos = await this.paymentInfoService.getAll(userId);
    let response: ApiResponse;
    response = {
      success: true,
      message: "Payment info fetched successfully",
      data: paymentInfos,
    };
    res.json(response);
  }

  async getPaymentInfoById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const paymentInfo = await this.paymentInfoService.getById(id);
    let response: ApiResponse;
    if (paymentInfo) {
      response = {
        success: true,
        message: "Payment info fetched successfully",
        data: paymentInfo,
      };
      res.status(200).json(response);
    }
    response = {
      success: false,
      message: "Payment info not found",
    };
    res.status(404).json(response);
  }
  async createPaymentInfo(req: Request, res: Response): Promise<void> {
    const paymentInfoData = req.body;
    const paymentInfo = await this.paymentInfoService.create(paymentInfoData);
    let response: ApiResponse;
    if (paymentInfo) {
      response = {
        success: true,
        message: "Payment info created successfully",
        data: paymentInfo,
      };
      res.status(201).json(response);
    }
    response = {
      success: false,
      message: "Failed to create payment info",
    };
    res.status(500).json(response);
  }
  async updatePaymentInfo(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const paymentInfoData = req.body;
    const updatedPaymentInfo = await this.paymentInfoService.update(
      id,
      paymentInfoData
    );
    let response: ApiResponse;
    if (updatedPaymentInfo) {
      response = {
        success: true,
        message: "Payment info updated successfully",
        data: updatedPaymentInfo,
      };
      res.status(200).json(response);
    }
    response = {
      success: false,
      message: "Payment info not found or failed to update",
    };
    res.status(404).json(response);
  }
  async deletePaymentInfo(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const isDeleted = await this.paymentInfoService.delete(id);
    let response: ApiResponse;
    if (isDeleted) {
      response = {
        success: true,
        message: "Payment info deleted successfully",
      };
      res.status(200).json(response);
    }
    response = {
      success: false,
      message: "Payment info not found or failed to delete",
    };
    res.status(404).json(response);
  }
  async linkWithInvoice(req: Request, res: Response): Promise<void> {
    const paymentInfo_id = req.params.id;
    const invoice_id = req.params.invoice_id;
    const response = await this.paymentInfoService.linkWithInvoice(
      paymentInfo_id,
      invoice_id
    );
    res.status(200).json(response);
  }
  async unlinkWithInvoice(req: Request, res: Response): Promise<void> {
    const paymentInfo_id = req.params.id;
    const invoice_id = req.params.invoice_id;
    const response = await this.paymentInfoService.unlinkWithInvoice(
      paymentInfo_id,
      invoice_id
    );
    res.status(200).json(response);
  }
  async isLinkedWithInvoice(req: Request, res: Response): Promise<void> {
    const paymentInfo_id = req.params.id;
    const invoice_id = req.params.invoice_id;
    const response = await this.paymentInfoService.isLinked(
      paymentInfo_id,
      invoice_id
    );
    res.status(200).json(response);
  }
}
