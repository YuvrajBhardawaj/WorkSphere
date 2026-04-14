import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AdminDashboardResponse } from '../interfaces/IResponses';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  private _dashboard = new BehaviorSubject<any>(null);
  dashboard$ = this._dashboard.asObservable();
  getAdminDashboardData(): Observable<AdminDashboardResponse> {
    return this.http
      .get<AdminDashboardResponse>(`${environment.backendUrl}/dashboard`, {
        withCredentials: true,
      })
      .pipe(
        tap((res: AdminDashboardResponse) => {
          if (res.success && res.data) {
            this._dashboard.next(res.data); // 🔥 THIS WAS MISSING
          }
        }),
      );
  }
}
