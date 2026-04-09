export interface RegisterUser {
  name: string;
  designation: string;
  experience: number;
  roleid: string;
  email: string;
  password: string;
}

export interface UserToken{
  id: string;
  role: string;
}