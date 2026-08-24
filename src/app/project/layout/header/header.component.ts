import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ModalService } from '../../../shared/services/modal.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private modalService = inject(ModalService);

  /** Авторизован ли пользователь */
  get isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

   /** Показать модалку подтверждения выхода */
  confirmLogout(): void {
    this.modalService.confirm('Точно выйти из профиля?').pipe(
      tap(result => {
        if (result) {
          this.logout();
        }
      })
    ).subscribe();
  }

  /** Выход из аккаунта */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
