import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

export const viewEmpResolver: ResolveFn<boolean> = async () => {

  const empService = inject(EmployeeService);

  await empService.fetchEmployees(); // 🔥 call supabase

  return true;
};