import { Person } from "./person.model";
import { Project } from "./project.model";

export class PersonProject {
  public id: number;
  public active: boolean;
  public isAdvisor: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public person: Person;
  public project: Project;

  constructor() {
    this.id = 0;
    this.active = true;
    this.isAdvisor = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.person = new Person();
    this.project = new Project();
  }
}
