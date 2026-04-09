import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { map } from 'rxjs';

export const viewEmpResolver: ResolveFn<boolean> = () => {
  const empService = inject(EmployeeService);

  return empService.fetchEmployees().pipe(
    map(() => true)
  );
};