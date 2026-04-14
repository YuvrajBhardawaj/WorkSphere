import { UserProfile } from "./user.dto";

export interface GetEmployeesResponse {
    success: boolean;
    data?: UserProfile[];
    total?: number;
    message: string;
}

export interface GetManagerResponse {
    success: boolean;
    data?: {id: string; name: string;}[];
    message: string;
}