import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, firstValueFrom, Observable, of, tap } from 'rxjs';
import { supabase } from '../supabase.client';
import { UserToken } from '../interfaces/IAuth';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interfaces/IResponses';
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {
    this.init();
  }
  private _user = new BehaviorSubject<UserToken | null | undefined>(undefined);
  user$ = this._user.asObservable();

  private init() {
    this.http.get<UserToken>('http://localhost:3000/api/me', {
      withCredentials: true
    }).pipe(
      tap(user => this._user.next(user)),
      catchError(() => {
        this._user.next(null);
        return of(null);
      })
    ).subscribe();  
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      'http://localhost:3000/api/login',
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap(
        res => {
          if(res.success && res.user)
            this._user.next(res.user)
        }
      )
    );
  }
}