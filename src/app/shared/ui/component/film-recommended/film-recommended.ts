import { Component, input, signal } from '@angular/core';
import { SimilarFilm } from '../../../interfaces/top-films.interface';
import { PageState } from '../../../types/state.type';
import { LoaderComponent } from '../loader/loader';

@Component({
  selector: 'app-film-recommended',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './film-recommended.html',
  styleUrl: './film-recommended.scss',
})
export class FilmRecommended {
  loading = signal(true);
  state = input<PageState>('loading');
  recommendedFilms = input.required<SimilarFilm[] | null>();
}
