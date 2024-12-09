import { Invoice } from "../../models/invoice.model";

export interface InvoiceServiceInterface {
  // get all invoices by user id
  getAllInvoicesByUserId(userId: string): Promise<Required<Invoice>[]>;
  // get invoice by id
  getInvoiceById(invoiceId: string): Promise<Required<Invoice> | null>;
  // create invoice
  createInvoice(invoiceData: Required<Invoice>): Promise<Invoice>;
  // update invoice
  updateInvoice(
    invoiceId: string,
    invoiceData: Partial<Invoice>
  ): Promise<Invoice | null>;
  // delete invoice
  deleteInvoice(invoice_id: string): Promise<boolean>;
}