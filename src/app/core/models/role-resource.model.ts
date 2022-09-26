import {Role} from "./role.model";
import {ResourceModel} from "./resource.model";

export class RoleResourceModel {
  public id: number;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public role: Role;
  public resource: ResourceModel;

  constructor() {
    this.id = 0;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.role = new Role();
    this.resource = new ResourceModel();
  }
}
