import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { EmployeeService } from '../../services/employee.service';
import { ViewEmployee } from '../../interfaces/IEmployee';
@Component({
  selector: 'app-view-employees',
  imports: [MaterialModule],
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
    'created',
  ];
  data: ViewEmployee[] = [];

  ngOnInit() {
    this.empService.employees$.pipe().subscribe((emps) => {
      // console.log(emps)
      this.data = emps;
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
