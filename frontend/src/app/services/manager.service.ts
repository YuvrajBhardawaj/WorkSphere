import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MangersList } from '../interfaces/IManager';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private _managers = new BehaviorSubject<MangersList[]>([]);
  managers$ = this._managers.asObservable();

  async fetchManagers() {
    
  }
}
