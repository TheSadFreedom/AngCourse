import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.authService.login(this.form.getRawValue())
      .subscribe({
        next: (res) => {
          console.log('LOGIN OK', res);
          this.router.navigate(['/']);
        },
        error: (err) => console.error('LOGIN ERROR', err)
      });
  }
}
