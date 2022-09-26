import { Commentary } from "./commentary.model";
import { Project } from "./project.model";

export class Requirement {
  public id: number;
  public name: string;
  public description: string;
  public filename: string;
  public code: string;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public project: Project;
  public commentaries: Commentary[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.filename = '';
    this.code = '';
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.project = new Project();
    this.commentaries = [];
  }
}
