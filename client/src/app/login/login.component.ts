import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private appService: AppService, private router: Router) {}

  /**
   * State flag for login error
   */
  public loginError = false;

  /**
   * Login form group
   */
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  /**
   * Triggered when form is submitted
   */
  public onSubmit() {
    if (!this.loginForm.valid) return;
    this.loginError = false;

    const observable = this.appService
      .login(
        this.loginForm.controls.email.value ?? '',
        this.loginForm.controls.password.value ?? ''
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.loginError = true;
          return throwError(() => err.message);
        })
      );

    observable.subscribe((response) => {
      this.loginError = false;
      this.appService.setLoginState(response.token, response.user);
      this.router.navigateByUrl('/dashboard');
    });
  }
}
