import {Invoice} from "./invoice.models";
import {EFeeStatus} from "@core/enums";

export class Fee {
  public id: number;
  public total: number;
  public status: EFeeStatus;
  public observation: string;
  public paymentDate: Date;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public invoice: Invoice;

  constructor() {
    this.id = 0;
    this.total = 0;
    this.status = EFeeStatus.PENDING;
    this.observation = '';
    this.paymentDate = new Date();
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.invoice = new Invoice();
  }
}
