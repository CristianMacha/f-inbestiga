import {ResourceModel} from "./resource.model";

export class PermissionModel {
  public id: number;
  public name: string;
  public active: boolean;
  public deleted: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public resource: ResourceModel;

  constructor() {
    this.id = 0;
    this.name = '';
    this.active = false;
    this.deleted = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.resource = new ResourceModel();
  }
}
