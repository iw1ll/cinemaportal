import { Component, effect, inject, input, signal } from '@angular/core';
import { FilmService } from '../../../../shared/services/film-api-service';
import { tap } from 'rxjs';
import { SimilarFilm } from '../../../../shared/interfaces/top-films.interface';

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
          console.log(this.recommendedFilms())
          // this.state.set('success');
        }
      )
      ).subscribe();
    }

}
