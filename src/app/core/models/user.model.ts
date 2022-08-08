export class User {
    public id: number;
    public email: string;
    public password: string;
    public active: boolean;
    public deleted: boolean;
    public createdAt: Date;
    public updatedAt: Date;
    constructor() {
        this.id = 0;
        this.email = '';
        this.password = '';
        this.active = false;
        this.deleted = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
