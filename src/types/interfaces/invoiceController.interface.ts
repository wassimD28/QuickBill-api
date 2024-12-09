import { Request, Response } from "express";

export interface InvoiceControllerInerface {
  getAllInvoices(req: Request, res: Response): Promise<void>;
  getInvoiceById(req: Request, res: Response): Promise<void>;
  createInvoice(req: Request, res: Response): Promise<void>;
  updateInvoice(req: Request, res: Response): Promise<void>;
  deleteInvoice(req: Request, res: Response): Promise<void>;
}