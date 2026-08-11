import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { FilmService } from '../../../../shared/services/film-api-service';
import { FilmDetail } from '../../../../shared/interfaces/top-films.interface';
import { FilmCard } from '../../../../shared/ui/component/film-card/film-card';
import { FilmRecommended } from '../film-recomended/film-recomended';
import { PageState } from '../../../../shared/types/state.type';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, FilmCard, FilmRecommended],
  templateUrl: './top-film-detail.component.html',
  styleUrl: './top-film-detail.component.scss',
})
export class TopFilmDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private filmService = inject(FilmService);
  private backNavigate = inject(Router);
  film = signal<FilmDetail | null>(null);
  state = signal<PageState>('loading');

  ngOnInit(): void {
    this.geDetails();
  }

  geDetails() {
    const id = this.route.snapshot.params['id'];
    this.filmService.geDetailsFilms(id).pipe(
      tap(data =>{
        this.film.set(data);
        this.state.set('success');
      }
    )
    ).subscribe();
  }

backToTopPage(): void {
  const fromPage = this.route.snapshot.queryParams['fromPage'] || 1;
  this.backNavigate.navigate(['/top'], {
    queryParams: { page: fromPage }
  });
}

}
