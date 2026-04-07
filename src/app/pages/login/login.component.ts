import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | null = null;                               // ✅ Fix 5: better UX than alert()

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
    this.auth.user$.subscribe(user => {
      if (user) this.router.navigate(['/dashboard']);
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value as { email: string; password: string }; // ✅ Fix 6: typed instead of 'any'

    try {
      await this.auth.login(email, password);
      this.router.navigate(['/dashboard']);
    } catch (err) {
      console.error(err);
      this.errorMessage = 'Login failed. Please check your credentials.'; // ✅ Fix 5 cont.
    }
  }
}
