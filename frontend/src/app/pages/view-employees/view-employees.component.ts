import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { EmployeeService } from '../../services/employee.service';
import { ViewEmployee } from '../../interfaces/IEmployee';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-view-employees',
  imports: [MaterialModule, RouterLink],
  templateUrl: './view-employees.component.html',
  styleUrl: './view-employees.component.css',
})
export class ViewEmployeesComponent {
  constructor(private empService: EmployeeService) {}
  displayedColumns: string[] = [
    'name',
    'designation',
    'experience',
    'role',
  ];
  data: ViewEmployee[] = [];
  currentPage = 1;
  pageSize = 10;
  ngOnInit() {
    this.empService.employees$.subscribe((emps) => {
      this.data = emps;
    });
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}