import { Component, inject, OnInit, signal } from '@angular/core';
import { TopService } from '../../../shared/services/top-service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Film } from '../../../shared/interfaces/top-films.interface';

@Component({
  selector: 'app-top',
  imports: [],
  templateUrl: './top.html',
  styleUrl: './top.scss',
})
export class TopFilmComponent implements OnInit {
  topService = inject(TopService);
  topFilms = signal<Film[]>([]);
  private router = inject(Router);

  ngOnInit(): void {
    this.getTopFilms();
  }

  getTopFilms() {
    this.topService.getTopFilms().pipe(
      tap((response) => {
        this.topFilms.set(response.films);
      })
    ).subscribe();
  }

  goToFilm(filmId: number): void {
    this.router.navigate(['/film', filmId]);
  }
}
