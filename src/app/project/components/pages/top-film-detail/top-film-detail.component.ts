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
  private route = inject(ActivatedRoute);
  private filmService = inject(FilmService);
  private backNavigate = inject(Router);
  film = signal<FilmDetail | null>(null);
  state = signal<PageState>('loading');
  recommendedFilms = signal<SimilarFilm[] | null>(null);
  recommendedState = signal<PageState>('loading');

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    forkJoin([this.getDetails(id), this.getRecommendedFilms(id)]).subscribe();
  }

  getDetails(id: number) {
    return this.filmService.geDetailsFilms(id).pipe(
      tap(data =>{
        this.film.set(data);
        this.state.set('success');
      })
    );
  }

  getRecommendedFilms(id: number) {
    return this.filmService.geSimilarFilms(id).pipe(
      tap(data =>{
        this.recommendedFilms.set(data.items);
        this.recommendedState = signal<PageState>('success');
      },
    ),
    catchError(() => {
        this.recommendedState.set('error');
        return of();
      })
    );
  }

  backToTopPage(): void {
    const fromPage = this.route.snapshot.queryParams['fromPage'] || 1;
    this.backNavigate.navigate(['/top'], {
      queryParams: { page: fromPage }
    });
  }
}
