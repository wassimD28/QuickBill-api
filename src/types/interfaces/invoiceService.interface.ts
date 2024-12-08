import { Invoice } from "../../models/invoice.model";

export interface InvoiceServiceInterface {
  // get all invoices by user id
  getAllInvoicesByUserId(userId: number): Promise<Required<Invoice>[]>;
  // get invoice by id
  getInvoiceById(invoiceId: number): Promise<Required<Invoice> | null>;
  // create invoice
  createInvoice(invoiceData: Required<Invoice>): boolean;
  // update invoice
  updateInvoice(invoiceId: number, invoiceData: Partial<Invoice>): boolean;
}