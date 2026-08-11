import { Component, input } from '@angular/core';
import { FilmDetail } from '../../../interfaces/top-films.interface';
import { CommonModule } from '@angular/common';
import { PageState } from '../../../types/state.type';
import { LoaderComponent } from '../loader/loader';

@Component({
  selector: 'app-film-card',
  imports: [CommonModule, LoaderComponent],
  standalone: true,
  templateUrl: './film-card.html',
  styleUrl: './film-card.scss',
})
export class FilmCardComponent {
  film = input.required<FilmDetail | null>();
  state = input.required<PageState>();

  getCountries(): string {
    const f = this.film();
    if (f !== null) {
      return f.countries?.map((c: { country: string }) => c.country).join(', ') ?? '';
    } else {
      return '';
    }
  }
}
