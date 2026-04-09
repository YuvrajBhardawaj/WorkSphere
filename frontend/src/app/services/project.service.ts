import { Injectable } from '@angular/core';

import { Project } from '../interfaces/IProject';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProjectDataResponse } from '../interfaces/IResponses';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
constructor(private http: HttpClient) {}

  private _projects = new BehaviorSubject<Project[]>([]);
  projects$ = this._projects.asObservable();

  async createProject(project: Project) {
    
  }

  loadProjects(limit: number = 10, offset: number = 0): Observable<ProjectDataResponse> {
    return this.http.get<ProjectDataResponse>(`${environment.backendUrl}/projects?limit=${limit}&offset=${offset}`, { withCredentials: true }).pipe(
      tap((response: ProjectDataResponse) => {
        if (response.success && response.data) {
          this._projects.next(response.data);
        } else {
          console.error('Failed to load projects:', response.message);
        }
      })
    );
  }
}
