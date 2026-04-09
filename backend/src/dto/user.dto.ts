export interface CreateUserDto {
  id?: string;
  name: string;
  designation: string;
  experience: number;
  roleid: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    role: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  designation: string;
  experience: number;
  role: string;
}