import { Component, OnInit } from '@angular/core';
import { Project } from '../../interfaces/IProject';
import { ProjectService } from '../../services/project.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-project-list',
  imports: [MaterialModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];

  currentPage = 1;
  pageSize = 5;

  displayedColumns: string[] = [
    'serial',
    'title',
    'created_at',
    'status',
    'assigned_to',
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();

    this.projectService.projects$.subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  loadProjects() {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.projectService.loadProjects(this.pageSize, offset);
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