import { Component, input, output } from '@angular/core';
import { StaffMember } from '../../../interfaces/top-films.interface';


@Component({
  selector: 'app-film-actors',
  imports: [],
  standalone: true,
  templateUrl: './film-actors.html',
  styleUrl: './film-actors.scss',
})
export class FilmActorsComponent {
  /** Все участники */
  staff = input.required<StaffMember[]>();
  /** Сколько актёров показывать */
  limit = input(10);
  /** Клик по кнопке "Весь каст" */
  viewAll = output<void>();
  /** Клик по актёру — передаём staffId наверх */
  actorClick = output<number>();

  /** Только актёры, ограниченное количество */
  get visibleActors(): StaffMember[] {
    return this.staff()
      .filter(s => s.professionKey === 'ACTOR')
      .slice(0, this.limit());
  }

  /** Сколько всего актёров */
  get totalActors(): number {
    return this.staff().filter(s => s.professionKey === 'ACTOR').length;
  }
}
