import {EInvoicePaymentMethod, EInvoiceStatus} from "../enums/invoice.enum";
import {Invoice} from "./invoice.models";
import {Person} from "./person.model";

export class Fee {
  public id: number;
  public total: number;
  public status: EInvoiceStatus;
  public fileName: string;
  public code: string;
  public active: boolean;
  public paymentMethod: EInvoicePaymentMethod;
  public createdAt: Date;
  public updatedAt: Date;
  public invoice: Invoice;
  public person: Person;

  constructor() {
    this.id = 0;
    this.total = 0;
    this.status = EInvoiceStatus.PENDING;
    this.fileName = '';
    this.code = '';
    this.active = false;
    this.paymentMethod = EInvoicePaymentMethod.CASH_PAYMENT;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.invoice = new Invoice();
    this.person = new Person();
  }
}
