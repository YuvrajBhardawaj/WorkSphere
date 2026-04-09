import { ViewEmployee } from "./IEmployee";
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
  message: string;
}

export interface ProjectDataResponse {
  success: boolean;
  data?: Project[]; 
  message: string;
}