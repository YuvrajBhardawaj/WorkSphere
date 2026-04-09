export interface Project {
  id?: string;
  title: string;
  description: string;
  assigned_to: string; // manager id
  days_allocated: number;
  status: 'active' | 'completed' | 'hold';
  created_at?: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
}

export interface GetProjectsResponse {
  success: boolean;
  data?: Project[];
  message: string;
}