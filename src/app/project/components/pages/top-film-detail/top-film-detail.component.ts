import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { FilmDetail, SimilarFilm, StaffMember } from '../../../../shared/interfaces/top-films.interface';
import { FilmCardComponent } from '../../../../shared/ui/component/film-card/film-card';
import { FilmRecommended } from '../../../../shared/ui/component/film-recommended/film-recommended';
import { PageState } from '../../../../shared/types/state.type';
import { FilmActorsComponent } from '../../../../shared/ui/component/film-actors/film-actors';
import { ActorService } from '../../../../shared/services/actor-api.service';
import { FilmService } from '../../../../shared/services/film-api.service';
import { PersonDetail } from '../../../../shared/interfaces/actors.interface';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, FilmCardComponent, FilmRecommended, FilmActorsComponent],
  templateUrl: './top-film-detail.component.html',
  styleUrl: './top-film-detail.component.scss',
})
export class TopFilmDetailComponent implements OnInit {
  /** Текущий маршрут для получения параметров */
  private route = inject(ActivatedRoute);
  /** Сервис для запросов к API по фильмам */
  private filmService = inject(FilmService);
  /** Сервис для запросов к API по фильмам */
  private actorService = inject(ActorService);
  /** Программная навигация */
  private navigate = inject(Router);

  /** Данные фильма */
  film = signal<FilmDetail | null>(null);
  /** Состояние загрузки фильма */
  state = signal<PageState>('loading');

  /** Похожие фильмы */
  recommendedFilms = signal<SimilarFilm[] | null>(null);
  /** Состояние загрузки рекомендаций */
  recommendedState = signal<PageState>('loading');

  /** Все участники */
  staff = signal<StaffMember[]>([]);

  /** Загружаем фильм и рекомендации параллельно */
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    forkJoin([
      this.getDetails(id),
      this.getRecommendedFilms(id),
      this.getStaff(id),
      this.getActor()
    ]).subscribe();
  }

  /** Запрос детальной информации о фильме */
  getDetails(id: number): Observable<FilmDetail> {
    return this.filmService.geDetailsFilms(id).pipe(
      tap(data => {
        this.film.set(data);
        this.state.set('success');
      }),
      //доделать
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

  /** Запрос актёров и съёмочной группы */
  getStaff(id: number): Observable<StaffMember[]> {
    return this.actorService.getStaff(id).pipe(
      tap(data => {
        this.staff.set(data);
        console.log(this.staff())
        // this.state.set('success');
      }),
      //доделать
    );
  }

  getActor(): Observable<PersonDetail> {
    return this.actorService.getPersonById(797).pipe(
      tap(a => console.log(a))
    );
    //врменно тут
  }

  /** Возврат к списку с сохранением страницы */
  backToTopPage(): void {
    const fromPage = this.route.snapshot.queryParams['fromPage'] || 1;
    this.navigate.navigate(['/top'], {
      queryParams: { page: fromPage },
    });
  }

  goToCast(): void {
    this.navigate.navigate(['/film', this.film()!.kinopoiskId, 'cast']);
  }

  goToActor(staffId: number): void {
    this.navigate.navigate(['/actor', staffId]);
  }
}
