import { ApiResponse } from "./../types/interfaces/common.interface";
import { Request, Response } from "express";
import { InvoiceControllerInerface } from "../types/interfaces/invoiceController.interface";
import { InvoiceService } from "../services/invoice.service";


export class InvoiceController implements InvoiceControllerInerface {
  constructor(private invoiceService: InvoiceService) {}
  async getAllInvoices(req: Request, res: Response): Promise<void> {
    const user_id = req.params.id;
    const invoices = await this.invoiceService.getAllInvoicesByUserId(user_id);
    let response: ApiResponse;
    response = {
      success: true,
      message: "Invoices fetched successfully",
      data: invoices,
    };
    res.status(200).json(response);
  }
  async getInvoiceById(req: Request, res: Response): Promise<void> {
    const invoice_id = req.params.id;
    const invoice = await this.invoiceService.getInvoiceById(invoice_id);
    let response: ApiResponse;
    if (!invoice) {
      response = {
        success: false,
        message: "Invoice not found",
      };
      res.status(404).send(response);
    }
    response = {
      success: true,
      message: "Invoice fetched successfully",
      data: invoice,
    };
    res.status(200).json(response);
  }
  async createInvoice(req: Request, res: Response): Promise<void> {
    const invoiceData = req.body;
    const invoice = await this.invoiceService.createInvoice(invoiceData);
    let response: ApiResponse;
    if (!invoice) {
      response = {
        success: false,
        message: "Failed to create invoice",
      };
      res.status(400).send(response);
    }
    response = {
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    };
    res.status(201).json(response);
  }
  async updateInvoice(req: Request, res: Response): Promise<void> {
    const invoice_id = req.params.id;
    const invoiceData = req.body;
    const invoice = await this.invoiceService.updateInvoice(invoice_id, invoiceData);
    let response: ApiResponse;
    if (!invoice) {
      response = {
        success: false,
        message: "Failed to update invoice",
      };
      res.status(400).send(response);
    }
    response = {
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
    };
    res.status(200).json(response);
  }
  async deleteInvoice(req: Request, res: Response): Promise<void> {
    const invoice_id = req.params.id;
    const deletedInvoice = await this.invoiceService.deleteInvoice(invoice_id);
    let response: ApiResponse;
    if (!deletedInvoice) {
      response = {
        success: false,
        message: "Failed to delete invoice",
      };
      res.status(400).send(response);
    }
    response = {
      success: true,
      message: "Invoice deleted successfully",
    };
    res.status(204).json(response);
  }
}
