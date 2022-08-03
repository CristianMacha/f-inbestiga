import {EProjectStatus} from "@core/enums";
import {Project} from "@core/models";

export interface ProjectInterfaceFilter {
  status: EProjectStatus;
  take: number;
  skip: number;
}

export interface ProjectAcceptInterface {
  projectId: number;
  amount: number;
  advisorId: number;
}

export interface ProjectResponseInterface {
  data: Project[];
  total: number;
}
