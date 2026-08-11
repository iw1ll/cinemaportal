import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { FilmService } from '../../../../shared/services/film-api-service';
import { FilmDetail, SimilarFilm } from '../../../../shared/interfaces/top-films.interface';
import { FilmCardComponent } from '../../../../shared/ui/component/film-card/film-card';
import { FilmRecommended } from '../../../../shared/ui/component/film-recommended/film-recommended';
import { PageState } from '../../../../shared/types/state.type';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, FilmCardComponent, FilmRecommended],
  templateUrl: './top-film-detail.component.html',
  styleUrl: './top-film-detail.component.scss',
})
export class TopFilmDetailComponent implements OnInit {
  /** Текущий маршрут для получения параметров */
  private route = inject(ActivatedRoute);
  /** Сервис для запросов к API */
  private filmService = inject(FilmService);
  /** Программная навигация */
  private backNavigate = inject(Router);

  /** Данные фильма */
  film = signal<FilmDetail | null>(null);
  /** Состояние загрузки фильма */
  state = signal<PageState>('loading');

  /** Похожие фильмы */
  recommendedFilms = signal<SimilarFilm[] | null>(null);
  /** Состояние загрузки рекомендаций (отдельно от фильма) */
  recommendedState = signal<PageState>('loading');

  /** Загружаем фильм и рекомендации параллельно */
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    forkJoin([
      this.getDetails(id),
      this.getRecommendedFilms(id),
    ]).subscribe();
  }

  /** Запрос детальной информации о фильме */
  getDetails(id: number) {
    return this.filmService.geDetailsFilms(id).pipe(
      tap(data => {
        this.film.set(data);
        this.state.set('success');
      }),
    );
  }

  /** Запрос похожих фильмов */
  getRecommendedFilms(id: number) {
    return this.filmService.geSimilarFilms(id).pipe(
      tap(data => {
        this.recommendedFilms.set(data.items);
        if (data.items.length === 0) {
          this.recommendedState.set('empty');
        } else {
          this.recommendedState.set('success');
        }
      }),
      catchError(() => {
        this.recommendedState.set('error');
        return of();
      }),
    );
  }

  /** Возврат к списку с сохранением страницы */
  backToTopPage(): void {
    const fromPage = this.route.snapshot.queryParams['fromPage'] || 1;
    this.backNavigate.navigate(['/top'], {
      queryParams: { page: fromPage },
    });
  }
}
