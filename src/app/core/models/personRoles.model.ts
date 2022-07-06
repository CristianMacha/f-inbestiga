import { Person } from "./person.model";
import { Role } from "./role.model";

export class PersonRoles {
  public id: number;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public person: Person;
  public role: Role;

  constructor() {
    this.id = 0;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.person = new Person();
    this.role = new Role();
  }
}