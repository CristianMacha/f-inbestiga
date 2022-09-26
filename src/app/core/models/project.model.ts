import { Invoice } from "./invoice.models";
import { PersonProject } from "./personProject.model";
import { Requirement } from "./requirement.model";
import { EInvoiceStatus } from "../enums/invoice.enum";
import { EProjectStatus } from "../enums/project.enum";
import { Category } from "./category.model";

export class Project {
  public id: number;
  public name: string;
  public code: string;
  public description: string;
  public progress: number;
  public inProgress: boolean;
  public statusPay: EInvoiceStatus;
  public status: EProjectStatus;
  public startDate: Date | string;
  public expirationDate: Date | string;
  public active: boolean;
  public deleted: boolean;
  public otherCategory: string;
  public createdAt: Date;
  public updatedAt: Date;
  public invoices: Invoice[];
  public personProjects: PersonProject[];
  public requirements: Requirement[];
  public category: Category[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.code = '';
    this.description = '';
    this.progress = 0;
    this.inProgress = false;
    this.statusPay = EInvoiceStatus.PENDING;
    this.status = EProjectStatus.REQUIRED;
    this.startDate = new Date();
    this.expirationDate = new Date();
    this.active = false;
    this.deleted = false;
    this.otherCategory = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.invoices = [];
    this.personProjects = [];
    this.requirements = [];
    this.category = [];
  }
}
