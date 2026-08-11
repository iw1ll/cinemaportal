import { Component, effect, inject, input, signal } from '@angular/core';
import { FilmService } from '../../../../shared/services/film-api-service';
import { catchError, of, tap } from 'rxjs';
import { SimilarFilm } from '../../../../shared/interfaces/top-films.interface';
import { PageState } from '../../../../shared/types/state.type';

@Component({
  selector: 'app-film-recommended',
  imports: [],
  templateUrl: './film-recommended.html',
  styleUrl: './film-recommended.scss',
})
export class FilmRecommended {
  filmId = input.required<number>();
  loading = signal(true);
  private filmService = inject(FilmService);
  recommendedFilms = signal<SimilarFilm[] | null>(null);
  state = signal<PageState>('loading');

  constructor() {
    setTimeout(() => this.loading.set(false), 1500);
    effect(() => {
      const id = this.filmId();
      if (id) {
        this.getRecommendedFilms(id);
      }
  });
  }

    getRecommendedFilms(id: number) {
      this.filmService.geSimilarFilms(id).pipe(
        tap(data =>{
          this.recommendedFilms.set(data.items);
          this.state.set('success');
        },
      ),
      catchError(() => {
          this.state.set('error');
          return of();
        })
      ).subscribe();
    }

}
