import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Project } from '../interfaces/IProject';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _projects = new BehaviorSubject<Project[]>([]);
  projects$ = this._projects.asObservable();

  async createProject(project: Project) {
    const { error } = await supabase.from('Projects').insert([
      {
        title: project.title,
        description: project.description,
        assigned_to: project.assigned_to,
        days_allocated: project.days_allocated,
        status: project.status,
      },
    ]);

    if (error) {
      console.error(error);
    }
  }

  async loadProjects(limit: number = 15, offset: number = 0) {
    const { data, error } = await supabase
      .from('Projects')
      .select(
        `
      id,
      title,
      description,
      status,
      created_at,
      assigned_to,
      Profiles (
        name
      )
    `,
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error(error);
      return;
    }

    // 🔥 Transform data (important)
    const transformed = (data || []).map((project: any) => ({
      ...project,
      assigned_to: project.Profiles?.name || 'Unknown',
    }));

    this._projects.next(transformed);
  }
}
