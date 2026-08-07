import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { TopService } from '../../../../shared/services/top-api-service';
import { FilmDetail } from '../../../../shared/interfaces/top-films.interface';
import { FilmCard } from '../../../../shared/ui/component/film-card/film-card';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule, FilmCard],
  templateUrl: './top-film-detail.component.html',
  styleUrl: './top-film-detail.component.scss',
})
export class TopFilmDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private topService = inject(TopService);
  private backNavigate = inject(Router);
  film = signal<FilmDetail | null>(null);

  ngOnInit(): void {
    this.geDetails();
  }

  geDetails() {
    const id = this.route.snapshot.params['id'];
    this.topService.geDetailsFilms(id).pipe(
      tap(data => this.film.set(data))
    ).subscribe();
  }

  backToTopPage() {
    this.backNavigate.navigate(['/top']);
  }
}
