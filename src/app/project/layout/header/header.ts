import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private router = inject(Router);

  /** Авторизован ли пользователь */
  get isAuth(): boolean {
    return !!localStorage.getItem('token');
  }

  /** Выход из аккаунта */
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
