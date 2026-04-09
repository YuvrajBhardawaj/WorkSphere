import { Component, Pipe, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Role } from '../../interfaces/IRole';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-create-emp',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './create-emp.component.html',
  styleUrl: './create-emp.component.css',
})
export class CreateEmpComponent {
  form!: FormGroup;
  roles!: Role[];
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private rolesService: RolesService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0)]],
      roleid: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.rolesService.roles$.subscribe((roles) => {
      this.roles = roles;
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.empService.createEmployee(this.form.value).subscribe({
      next: () => this.form.reset(),
      error: (err) => console.error(err),
    });
  }
}
