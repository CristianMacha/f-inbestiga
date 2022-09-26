export class Category {
  public id: number;
  public name: string;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  constructor() {
      this.id = 0;
      this.name = '';
      this.active = false;
      this.createdAt = new Date();
      this.updatedAt = new Date();
  }
}