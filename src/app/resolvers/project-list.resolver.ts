import { ResolveFn } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { inject } from '@angular/core';

export const projectListResolver: ResolveFn<boolean> = async (route, state) => {
  const projectService = inject(ProjectService);
  await projectService.loadProjects();
  return true;
};
