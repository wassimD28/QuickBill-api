import { Request, Response } from "express";
import { InvoiceControllerInerface } from "../types/interfaces/invoiceController.interface";
import { InvoiceService } from "../services/invoice.service";

export class InvoiceController implements InvoiceControllerInerface{
  constructor(private invoiceService: InvoiceService ){}
  async getAllInvoices(req: Request, res: Response): Promise<void> {
    const user_id = req.params.id
    const invoices = await this.invoiceService.getAllInvoicesByUserId(user_id)
    res.status(200).json(invoices)
  }
  getInvoiceById(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createInvoice(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateInvoice(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteInvoice(req: Request, res: Response): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  
}