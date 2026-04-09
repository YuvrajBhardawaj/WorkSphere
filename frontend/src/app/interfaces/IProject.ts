export interface Project {
  id?: string;
  title: string;
  description: string;
  assigned_to: string; 
  days_allocated: number;
  status: 'active' | 'completed' | 'hold';
  created_at?: string;
}