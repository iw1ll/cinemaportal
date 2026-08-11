import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-film-recommended',
  imports: [],
  templateUrl: './film-recommended.html',
  styleUrl: './film-recommended.scss',
})
export class FilmRecommended {
 filmId = input.required<number>();
  loading = signal(true);

  constructor() {
    setTimeout(() => this.loading.set(false), 1500);
  }
}
