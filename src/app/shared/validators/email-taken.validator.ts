import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

/** Валидатор проверки занятости email-адреса */
export function emailTakenValidator(): AsyncValidatorFn {
  const authService = inject(AuthService);

  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }


    return authService.checkEmail(control.value).pipe(
      map(result => {
        return result.exists ? { emailTaken: true } : null;
      }),
      catchError((err) => {
        console.error('Ошибка валидатора проверки email:', err);
        return of(null);
      }),
    );
  };
}
