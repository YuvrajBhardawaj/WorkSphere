import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Role } from '../interfaces/IRole';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _roles = new BehaviorSubject<Role[]>([]);
  roles$ = this._roles.asObservable();

  async fetchRoles() {
    
  }
}