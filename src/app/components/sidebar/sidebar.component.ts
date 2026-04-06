import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  private sidebarService = inject(SidebarService);
  isExpanded = this.sidebarService.isExpanded;
  
  menu = [
    { name: 'Dashboard', icon: '🏠', route: '/dashboard' },
    { name: 'Employees', icon: '👨‍💼', route: '/employees' },
    { name: 'Add Employee', icon: '➕', route: '/add' },
    { name: 'Settings', icon: '⚙️', route: '/settings' }
  ];

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}