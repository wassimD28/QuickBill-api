import { Invoice } from "../models/invoice.model";
import { InvoiceServiceInterface } from "../types/interfaces/invoiceService.interface";

export class InvoiceService implements InvoiceServiceInterface {
  async getAllInvoicesByUserId(user_id: string): Promise<Required<Invoice>[]> {
    return await Invoice.findAll({ where: { user_id } });
  }
  async getInvoiceById(invoice_id: string): Promise<Required<Invoice> | null> {
    return await Invoice.findOne({ where: { id: invoice_id } });
  }
  async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    return await Invoice.create(invoiceData);
  }
  async updateInvoice(invoiceId: string, invoiceData: Partial<Invoice>): Promise<Invoice| null>  {
    const invoice = await Invoice.findByPk(invoiceId);
    if (invoice) {
      await invoice.update(invoiceData);
      return invoice;
    }
    return null;
  }
}
