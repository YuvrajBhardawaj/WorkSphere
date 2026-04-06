import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MaterialModule } from '../../material/material.module';
import { MangersList } from '../../interfaces/IManager';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {
  form!: FormGroup;
  managers!: MangersList[];
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private managerService: ManagerService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assigned_to: ['', Validators.required],
      days_allocated: [1, [Validators.required, Validators.min(1)]],
      status: ['pending', Validators.required],
    });

    this.managerService.managers$.subscribe((data: MangersList[]) => {
      this.managers = data;
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    await this.projectService.createProject(this.form.value);

    this.form.reset({
      status: 'pending',
      days_allocated: 1,
    });
  }
}
