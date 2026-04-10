import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MangersList } from '../interfaces/IManager';
import { ManagersListResponse } from '../interfaces/IResponses';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private http: HttpClient) {}
  private _managers = new BehaviorSubject<MangersList[]>([]);
  managers$ = this._managers.asObservable();

  fetchManagers(): Observable<ManagersListResponse> {
    return this.http.get<ManagersListResponse>(`${environment.backendUrl}/managers`, { withCredentials: true }).pipe(
      tap((response: ManagersListResponse) => {
        if (response.success && response.data) {
          this._managers.next(response.data);
        } else {
          console.error('Failed to load managers:', response.message);
        }
      })
    );
  }
}
