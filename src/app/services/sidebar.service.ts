import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isExpanded = signal(true);

  constructor() {
    // Load sidebar state from localStorage
    const saved = localStorage.getItem('sidebarExpanded');
    if (saved !== null) {
      this.isExpanded.set(JSON.parse(saved));
    }
  }

  toggleSidebar() {
    this.isExpanded.update(value => !value);
    localStorage.setItem('sidebarExpanded', JSON.stringify(this.isExpanded()));
  }
}
