import { Component } from '@angular/core';
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
  total: number = 0;
  displayedColumns: string[] = [
    'serial',
    'name',
    'designation',
    'experience',
    'role',
  ];
  data: ViewEmployee[] = [];
  currentPage = 1;
  pageSize = 10;
  ngOnInit() {
    this.empService.employees$.subscribe((emps: ViewEmployee[]) => {
      this.data = emps;
    });
    this.total = this.empService.total;
  }

  nextPage() {
    this.currentPage++;
    this.empService.fetchEmployees(this.currentPage, this.pageSize).subscribe();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.empService.fetchEmployees(this.currentPage, this.pageSize).subscribe();
    }
  }
}