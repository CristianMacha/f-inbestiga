import {PaymentConceptEnum, PaymentStatusEnum} from "@core/enums";
import {Person} from "./person.model";

export class PaymentModel {
  public id: number;
  public amount: number;
  public code: string;
  public concept: PaymentConceptEnum;
  public conceptId: number;
  public status: PaymentStatusEnum;
  public active: boolean;
  public deleted: boolean;
  public person: Person;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {
    this.id = 0;
    this.amount = 0;
    this.code = '';
    this.concept = PaymentConceptEnum.FEE;
    this.conceptId = 0;
    this.status = PaymentStatusEnum.PROCESSING;
    this.active = false;
    this.deleted = true;
    this.person = new Person();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
