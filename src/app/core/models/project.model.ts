import { Invoice } from "./invoice.models";
import { PersonProject } from "./personProject.model";

export class Project {
  public id: number;
  public name: string;
  public description: string;
  public progress: number;
  public inProgress: boolean;
  public status: string;
  public expirationDate: Date | string;
  public active: boolean;
  public deleted: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public invoices: Invoice[];
  public personProjects: PersonProject[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.progress = 0;
    this.inProgress = false;
    this.status = '';
    this.expirationDate = new Date();
    this.active = false;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.invoices = [];
    this.personProjects = [];
  }
}
