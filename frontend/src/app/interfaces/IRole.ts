export interface Role {
  id: string;     
  name: 'admin' | 'manager' | 'employee';
  created_at?: string;
}