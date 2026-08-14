import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmDetail } from '../../../interfaces/top-films.interface';
import { PageState } from '../../../types/state.type';
import { LoaderComponent } from '../loader/loader';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './film-card.html',
  styleUrl: './film-card.scss',
})
export class FilmCardComponent {
  /** Данные фильма для отображения */
  film = input.required<FilmDetail | null>();
  /** Состояние загрузки */
  state = input.required<PageState>();

  /** Собирает список стран через запятую */
  getCountries(): string {
    const f = this.film();
    if (f !== null) {
      return f.countries?.map((c: { country: string }) => c.country).join(', ') ?? '';
    }
    return '';
  }
}
