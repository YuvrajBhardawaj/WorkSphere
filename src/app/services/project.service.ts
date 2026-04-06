import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Project } from '../interfaces/IProject';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  async createProject(project: Project) {

    const { error } = await supabase
      .from('Projects')
      .insert([
        {
          title: project.title,
          description: project.description,
          assigned_to: project.assigned_to,
          days_allocated: project.days_allocated,
          status: project.status
        }
      ]);

    if (error) {
      console.error(error);
    }
  }
}