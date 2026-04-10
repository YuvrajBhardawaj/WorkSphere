import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { RolesService } from '../services/roles.service';

export const rolesResolver: ResolveFn<boolean> = async () => {
  const rolesService = inject(RolesService);
  rolesService.fetchRoles().subscribe();
  return true;
};