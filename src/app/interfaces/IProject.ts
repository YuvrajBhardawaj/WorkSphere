export interface Project {
  id?: string;
  title: string;
  description: string;
  assigned_to: string; // manager id
  days_allocated: number;
  status: 'pending' | 'completed' | 'hold';
  created_at?: string;
}