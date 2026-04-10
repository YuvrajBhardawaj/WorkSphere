import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Role } from '../interfaces/IRole';
import { HttpClient } from '@angular/common/http';
import { RoleDataResponse } from '../interfaces/IResponses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}
  private _roles = new BehaviorSubject<Role[]>([]);
  roles$ = this._roles.asObservable();

  fetchRoles(): Observable<RoleDataResponse> {
    return this.http
      .get<RoleDataResponse>(`${environment.backendUrl}/roles`, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this._roles.next(res.data);
          } else {
            console.error('Failed to load roles:', res.message);
          }
        }),
      );
  }
}
