import { PersonRoles } from "./personRoles.model";
import { User } from "./user.model";

export class Person {
  public id: number;
  public fullName: string;
  public surnames: string;
  public code: string;
  public phone: string;
  public createdAt: Date;
  public updatedAt: Date;
  public user: User;
  public active: boolean;
  public personRoles: PersonRoles[];

  constructor() {
    this.id = 0;
    this.fullName = '';
    this.surnames = '';
    this.code = '';
    this.phone = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.user = new User();
    this.active = false;
    this.personRoles = [];
  }
}
