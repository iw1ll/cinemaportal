import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guard аутентификации для защиты маршрутов от неавторизованного доступа.
 */
export const authGuard: CanActivateFn = () => {
  /** Router для навигации */
  const router = inject(Router);
  /** Токен аутентификации  */
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
