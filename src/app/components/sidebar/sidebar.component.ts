import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { UserToken } from '../../interfaces/IAuth';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private sidebarService = inject(SidebarService);
  isExpanded = this.sidebarService.isExpanded;
  currentUser: UserToken | null = null;
  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user !== undefined) {
        this.currentUser = user; // now safely UserToken | null
      }
    });
  }
}
