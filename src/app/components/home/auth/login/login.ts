import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { LoginToken } from '../../types/user.interface';
import { Location, NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink,NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  userLoginForm: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';
  
  constructor(private fb: FormBuilder,private authService: AuthService,private location: Location) {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void {
    if (this.userLoginForm.invalid) {
      this.alertMessage = 'Please fill both email and password.';
      this.alertType = 1;
      this.userLoginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.userLoginForm.value;

    this.userLoginForm.disable();

    this.authService.login(email, password).subscribe({
      next: (result: LoginToken) => {
        this.userLoginForm.enable();

        if (result.token) {
          this.authService.activateToken(result);
          this.alertMessage = 'Login successful';
          this.alertType = 0;
          this.userLoginForm.reset();
        } else {
          this.alertMessage = 'Invalid login attempt.';
          this.alertType = 1;
        }
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      error: (err) => {
        this.userLoginForm.enable();
        this.alertMessage =
          err.error?.message || 'Login failed. Please try again.';
        this.alertType = 2;
      },
    });
  }
}
