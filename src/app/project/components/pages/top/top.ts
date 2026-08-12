import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../../../shared/interfaces/top-films.interface';
import { PaginationComponent } from '../../../../shared/ui/component/pagination/pagination.component';
import { catchError, of, tap } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { PageState } from '../../../../shared/types/state.type';
import { LoaderComponent } from '../../../../shared/ui/component/loader/loader';
import { FilmService } from '../../../../shared/services/film-api.service';

@Component({
  selector: 'app-top',
  imports: [PaginationComponent, NgTemplateOutlet, LoaderComponent],
  templateUrl: './top.html',
  styleUrl: './top.scss',
})
export class TopFilmComponent implements OnInit {
  /** Сервис для запросов */
  filmService = inject(FilmService);
  /** Список фильмов текущей страницы */
  topFilms = signal<Film[]>([]);
  /** Программная навигация */
  private router = inject(Router);
  /** Доступ к query-параметрам URL */
  private route = inject(ActivatedRoute);
  /** Текущая страница */
  currentPage = signal(1);
  /** Всего страниц */
  totalPages = signal(1);
  /** Состояние страницы*/
  state = signal<PageState>('loading');

  ngOnInit(): void {
    const page = Number(this.route.snapshot.queryParams['page']) || 1;
    this.getTopFilms(page);
  }

  /** Загружает фильмы */
  getTopFilms(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      replaceUrl: true,
    });

    this.state.set('loading');
    this.currentPage.set(page);

    this.filmService.getTopFilms(page).pipe(
      tap(response => {
        this.topFilms.set(response.items);
        this.totalPages.set(response.totalPages);
        this.state.set('success');
      }),
      catchError(() => {
        this.state.set('error');
        return of();
      })
    ).subscribe();
  }

  /** Переход на страницу фильма */
  goToFilm(filmId: number): void {
    this.router.navigate(['/film', filmId], {
      queryParams: { fromPage: this.currentPage() }
    });
  }

  /** Предыдущая страница */
  prevPage(): void {
    if (this.currentPage() > 1) {
      this.getTopFilms(this.currentPage() - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /** Следующая страница */
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.getTopFilms(this.currentPage() + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
