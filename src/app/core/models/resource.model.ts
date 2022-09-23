import {PermissionModel} from "./permission.model";
import {RoleResourceModel} from "./role-resource.model";

export class ResourceModel {
  public id: number;
  public name: string;
  public url: string;
  public order: number;
  public icon: string;
  public active: boolean;
  public deleted: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public permissions: PermissionModel[];
  public roleResources: RoleResourceModel[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.url = '';
    this.order = 0;
    this.icon = '';
    this.active = false;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.permissions = [];
    this.roleResources = [];
  }
}
