import { User } from "@core/models";

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    userDb: User;
}
