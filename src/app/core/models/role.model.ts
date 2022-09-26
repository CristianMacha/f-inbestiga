import {PersonRoles} from "./personRoles.model";

export class Role {
  public id: number;
  public name: string;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public personRoles: PersonRoles[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.personRoles = [];
  }
}
