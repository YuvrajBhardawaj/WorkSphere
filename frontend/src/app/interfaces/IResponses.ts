import { ViewEmployee } from "./IEmployee";
import { MangersList } from "./IManager";
import { Project } from "./IProject";

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {id: string; role: string};
}

export interface EmployeeDataResponse {
  success: boolean;
  data?: ViewEmployee[];
  total?: number;
  message: string;
}

export interface ProjectDataResponse {
  success: boolean;
  data?: Project[]; 
  message: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
}

export interface RoleDataResponse {
  success: boolean;
  data?: {id: string; name: string}[]; 
  message: string;
}

export interface ManagersListResponse {
  success: boolean;
  data?: MangersList[]; 
  message: string;
}