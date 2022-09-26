import {PersonRoles, ResourceModel, User} from "@core/models";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  fullname: string;
  phone: string;
}

export interface IPassword {
  password: string;
  newPassword: string;
  passwordNewVerify: string;
}

export interface ILoginResponse {
  token: string;
  userDb: User;
  personRoles?: PersonRoles[],
  resources?: ResourceModel[],
}
