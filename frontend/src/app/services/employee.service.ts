import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { RegisterUser } from '../interfaces/IAuth';
import { ViewEmployee } from '../interfaces/IEmployee';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, EmployeeDataResponse } from '../interfaces/IResponses';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private _employees = new BehaviorSubject<ViewEmployee[]>([]);
  employees$ = this._employees.asObservable();

  createEmployee(emp: RegisterUser): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.backendUrl}/create-user`,
      emp,
      { withCredentials: true },
    );
  }

  fetchEmployees(): Observable<EmployeeDataResponse> {
    return this.http
      .get<EmployeeDataResponse>(`${environment.backendUrl}/employees`, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            this._employees.next(res.data);
          }
        }),
      );
  }
}
