import { UserProfile } from "./user.dto";

export interface GetEmployeesResponse {
    success: boolean;
    data?: UserProfile[];
    message: string;
}