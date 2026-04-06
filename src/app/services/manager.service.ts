import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { supabase } from '../supabase.client';
import { MangersList } from '../interfaces/IManager';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private _managers = new BehaviorSubject<MangersList[]>([]);
  managers$ = this._managers.asObservable();

  async fetchManagers() {
  const MANAGER_ROLE_ID = 'your-manager-uuid-here';

  const { data, error } = await supabase
    .from('Profiles')
    .select('id, name')
    .eq('roleid', 'f384e385-3b43-44b4-873a-c206577d5c1d'); // 🔥 direct filter

  if (error) {
    console.error(error);
    return;
  }

  this._managers.next(data || []);
}
}
