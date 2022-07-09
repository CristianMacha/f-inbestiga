import { Person } from "./person.model";
import { Project } from "./project.model";
import { Requirement } from "./requirement.model";

export class Commentary {
  public id: number;
  public content: string;
  public person: Person;
  public project: Project;
  public requirement: Requirement;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor() {
    this.id = 0;
    this.content = '',
    this.person = new Person();
    this.project = new Project();
    this.requirement = new Requirement();
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
