import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /** Сервис для запросов авторизации на бэк */
  private authService = inject(AuthService);
  /** Роутер для программной навигации */
  private router = inject(Router);

  /** Форма логина */
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  /** Отправка формы */
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login({
      email: email ?? '',
      password: password ?? '',
    }).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/top']);
      }),
      catchError((err) => {
        console.error('Ошибка логина:', err);
        return of(null);
      })
    ).subscribe();
  }
}
