export interface EmployeeCount {
  totalEmployees: number;
}

export interface ManagerCount {
  totalManagers: number;
}

export interface OngoingProjectsCount {
  totalOngoingProjects: number;
}

export interface ProjectStatusCount {
  status: string;
  count: number;
}

export interface MonthlyProjectCreationCount {
  month: string; // "YYYY-MM"
  count: number;
}