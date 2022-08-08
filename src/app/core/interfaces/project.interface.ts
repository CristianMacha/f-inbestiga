import {EProjectStatus} from "@core/enums";
import {FilterListInterface} from "./filter.interface";

export interface ProjectInterfaceFilter extends FilterListInterface{
  status: EProjectStatus;
}

export interface ProjectAcceptInterface {
  projectId: number;
  amount: number;
  advisorId: number;
}
