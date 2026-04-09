// interfaces/IEmployee.ts
export interface ViewEmployee {
  id?: string;
  name: string;
  designation: string;
  experience: number | null;
  created_at?: string;
  role: string;
}