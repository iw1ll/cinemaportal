import { Component, inject, OnInit, signal } from '@angular/core';
import { ActorService } from '../../../../shared/services/actor-api.service';
import { ActivatedRoute } from '@angular/router';
import { PersonDetail } from '../../../../shared/interfaces/actors.interface';
import { PageState } from '../../../../shared/types/state.type';
import { LoaderComponent } from '../../../../shared/ui/component/loader/loader';
import { ActorDetailComponent } from '../../../../shared/ui/component/actor-detail/actor-detail';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-actor',
  imports: [ActorDetailComponent, LoaderComponent],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.scss',
})
export class ActorComponent implements OnInit {
  /** Сервис для доступа к параметрам маршрута */
  private route = inject(ActivatedRoute);
  /** Сервис для работы с API актеров */
  private actorService = inject(ActorService);
  /** Сигнал с данными о актере */
  person = signal<PersonDetail | null>(null);

  /** Сигнал с состоянием загрузки страницы */
  state = signal<PageState>('loading');

  ngOnInit(): void {
    this.getPersonById();
  }

  /** Получает данные о персоне */
  getPersonById() {
    const id = this.route.snapshot.params['id'];

    this.actorService.getPersonById(id).pipe(
      tap((actor) => {
        this.person.set(actor); // Устанавливаем данные о персоне
        this.state.set('success'); // Меняем состояние на "успешно"
      }),
      catchError(() => {
        this.state.set('error');
        return of(null);
      })
    ).subscribe()
  }
}
