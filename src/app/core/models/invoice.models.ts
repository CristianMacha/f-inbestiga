import { EInvoiceStatus } from "../enums/invoice.enum";
import { Project } from "./project.model";

export class Invoice {
  public id: number;
  public total: number;
  public feesNumber: number;
  public status: EInvoiceStatus;
  public description: string;
  public active: boolean;
  public expirationDate: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public project: Project;

  constructor() {
    this.id = 0;
    this.total = 0;
    this.feesNumber = 0;
    this.status = EInvoiceStatus.PENDING;
    this.description = '';
    this.active = false;
    this.expirationDate = new Date();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.project = new Project();
  }
}
