import {Invoice} from "./invoice.models";
import {Person} from "./person.model";
import {EFeePaymentMethod, EFeeStatus} from "@core/enums";

export class Fee {
  public id: number;
  public total: number;
  public status: EFeeStatus;
  public fileName: string;
  public observation: string;
  public code: string;
  public active: boolean;
  public paymentMethod: EFeePaymentMethod;
  public createdAt: Date;
  public updatedAt: Date;
  public invoice: Invoice;
  public person: Person;

  constructor() {
    this.id = 0;
    this.total = 0;
    this.status = EFeeStatus.PENDING;
    this.fileName = '';
    this.observation = '';
    this.code = '';
    this.active = false;
    this.paymentMethod = EFeePaymentMethod.CASH_PAYMENT;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.invoice = new Invoice();
    this.person = new Person();
  }
}
