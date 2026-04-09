import { ViewEmployee } from "./IEmployee";

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