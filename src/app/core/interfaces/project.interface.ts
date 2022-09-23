import {EProjectStatus} from "@core/enums";
import { Fee } from "../models/fee.model";
import { Invoice } from "../models/invoice.models";
import { Person } from "../models/person.model";
import { PersonProject } from "../models/personProject.model";
import { Project } from "../models/project.model";
import {FilterListInterface} from "./filter.interface";

export interface CreateProjectInterface {
  project: Project;
  invoice: Invoice;
  advisors: PersonProject[];
  students: PersonProject[];
  fees: Fee[];
}

export interface ProjectInterfaceFilter extends FilterListInterface{
  status: EProjectStatus;
}

export interface ProjectAcceptInterface {
  projectId: number;
  amount: number;
  advisorId: number;
  fees: Fee[];
}
