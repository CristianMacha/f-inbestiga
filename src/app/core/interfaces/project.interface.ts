import {EProjectStatus} from "@core/enums";

export interface ProjectInterfaceFilter {
  status: EProjectStatus
}

export interface ProjectAcceptInterface {
  projectId: number;
  amount: number;
  advisorId: number;
}
