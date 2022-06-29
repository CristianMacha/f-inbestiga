import { User } from "@core/models";

export interface ILogin {
    user: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    user: User;
}
