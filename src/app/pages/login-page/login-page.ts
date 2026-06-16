import { Router } from '@angular/router';
import { AuthService } from './services/auth-service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit(){

    if (this.form.valid){
      console.log(this.form.value);
      if (this.form.valid) {
        this.authService.login(this.form.getRawValue())
          .subscribe({
          next: (res) => {
            console.log(res),
            this.router.navigate([''])
          },
          error: (err) => console.error(err)
      });
  }
    }

  }
}
