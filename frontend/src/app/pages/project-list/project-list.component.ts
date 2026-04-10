import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/IProject';
import { ProjectService } from '../../services/project.service';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-project-list',
  imports: [MaterialModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];

  currentPage = 1;
  pageSize = 10;

  displayedColumns: string[] = [
    'serial',
    'title',
    'created_at',
    'status',
    'assigned_to',
    'days_allocated',
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.projects$.subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  loadProjects() {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.projectService.loadProjects(this.pageSize, offset).subscribe();
  }

  nextPage() {
    this.currentPage++;
    this.loadProjects();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProjects();
    }
  }
}