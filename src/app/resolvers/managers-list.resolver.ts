import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ManagerService } from '../services/manager.service';

export const managersListResolver: ResolveFn<boolean> = async (route, state) => {
  const mngService = inject(ManagerService);
  await mngService.fetchManagers();
  return true;
};