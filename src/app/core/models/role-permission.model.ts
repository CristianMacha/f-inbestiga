import {Role} from "./role.model";
import {PermissionModel} from "./permission.model";

export class RolePermissionModel {
  public id: number;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public role: Role;
  public permission: PermissionModel;

  constructor() {
    this.id = 0;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.role = new Role();
    this.permission = new PermissionModel();
  }
}
