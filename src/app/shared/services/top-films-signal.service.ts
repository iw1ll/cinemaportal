import { Injectable, inject, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { Film } from '../interfaces/top-films.interface';
import { PageState } from '../types/state.type';
import { FilmService } from './film-api.service';

@Injectable({ providedIn: 'root' })
export class TopFilmsSignalService {
  private filmService = inject(FilmService);

  /** Данные */
  films = signal<Film[]>([]);
  /** Состояние */
  state = signal<PageState>('loading');
  /** Текущая страница */
  currentPage = signal(1);
  /** Всего страниц */
  totalPages = signal(1);

  /** Загрузить фильмы */
  loadFilms(page: number): void {
    this.state.set('loading');
    this.currentPage.set(page);

    this.filmService.getTopFilms(page).pipe(
      tap(response => {
        this.films.set(response.items);
        this.totalPages.set(response.totalPages);
        this.state.set('success');
      }),
      catchError(() => {
        this.state.set('error');
        return of();
      })
    ).subscribe();
  }

  /** Следующая страница */
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.loadFilms(this.currentPage() + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /** Предыдущая страница */
  prevPage(): void {
    if (this.currentPage() > 1) {
      this.loadFilms(this.currentPage() - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
