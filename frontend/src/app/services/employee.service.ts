import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { RegisterUser } from '../interfaces/IAuth';
import { ViewEmployee } from '../interfaces/IEmployee';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, EmployeeDataResponse } from '../interfaces/IResponses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private _employees = new BehaviorSubject<ViewEmployee[]>([]);
  employees$ = this._employees.asObservable();
  total: number = 0;

  createEmployee(emp: RegisterUser): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.backendUrl}/create-user`,
      emp,
      { withCredentials: true },
    );
  }

  fetchEmployees(
    page: number = 1,
    limit: number = 10,
  ): Observable<EmployeeDataResponse> {
    return this.http
      .get<EmployeeDataResponse>(
        `${environment.backendUrl}/employees?page=${page}&limit=${limit}`,
        { withCredentials: true },
      )
      .pipe(
        tap((res: EmployeeDataResponse) => {
          if (res.success && res.data) {
            this._employees.next(res.data);
            this.total = res.total || 0;
          }
        }),
      );
  }
}
