import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  private userSub!: Subscription;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,                                         // ✅ already correct in usage, just missing import
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    // Only redirect if user is already confirmed (skip undefined = still initializing)
    this.userSub = this.auth.user$.pipe(
      filter(user => user !== undefined)
    ).subscribe(user => {
      if (user) this.router.navigate(['/dashboard']);
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
  if (this.form.invalid) return;

  this.isLoading = true;
  this.errorMessage = null;

  const { email, password } = this.form.value;

  this.auth.login(email, password).subscribe({
    next: (res) => {
      if (res.success && res.user) {
        this.router.navigate(['/dashboard']);
      }
      this.isLoading = false;
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'Login failed. Please check your credentials.';
      this.isLoading = false;
    }
  });
}
}
