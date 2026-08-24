import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import {
  forbiddenNameValidator,
  phoneValidator,
} from '../../../../shared/validators/custom-validators';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { emailTakenValidator } from '../../../../shared/validators/email-taken.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  /** Сервис для аутентификации пользователей */
  private authService = inject(AuthService);
    /** Сервис для навигации между маршрутами */
  private router = inject(Router);
  /** Регулярное выражение для валидации email адреса */
  EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /** Основная форма регистрации с полями и валидаторами */
  registerForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), forbiddenNameValidator('admin')],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern(this.EMAIL_PATTERN),
      ],
      asyncValidators: [emailTakenValidator()],
      // updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    }),
    phones: new FormArray([
      new FormControl('', {
        validators: [phoneValidator()],
        updateOn: 'blur',
      }),
    ]),
  });

  /** Геттер для удобного доступа к массиву телефонов */
  get phones(): FormArray {
    return this.registerForm.get('phones') as FormArray;
  }

  /** Добавляет новое поле */
  addPhone(): void {
    this.phones.push(new FormControl('', Validators.required));
  }

    /** Удаляет поле телефона */
  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  /** Обработчик отправки формы регистрации */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register({
      email: email ?? '',
      password: password ?? '',
      name: name ?? '',
    }).pipe(
      tap(() => {
         console.log('✅ Регистрация успешна');
          this.router.navigate(['/login']);
      }),
      catchError((err) => {
         console.error('❌ Ошибка регистрации:', err);
         return of(null);
      })
    ).subscribe();
  }
}
