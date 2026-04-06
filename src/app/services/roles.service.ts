import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../supabase.client';
import { Role } from '../interfaces/IRole';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _roles = new BehaviorSubject<Role[]>([]);
  roles$ = this._roles.asObservable();

  async fetchRoles() {
    const { data, error } = await supabase
      .from('Roles')
      .select('id, name');

    if (error) {
      console.error(error);
      return;
    }

    this._roles.next(data || []);
  }
}