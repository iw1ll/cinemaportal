import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FilmDetail } from '../../../shared/interfaces/top-films.interface';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-film-detail.component.html',
  styleUrl: './top-film-detail.component.scss',
})
export class TopFilmDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private backNavigate = inject(Router);

  film = signal<FilmDetail | null>(null);

  getCountries(): string {
    const f = this.film();
    return f?.countries?.map((c: { country: string }) => c.country).join(', ') ?? '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.http
      .get<FilmDetail>(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        headers: { 'X-API-KEY': environment.kinopoiskApiKey },
      })
      .subscribe(data => {
         this.film.set(data)
      });
  }

  backToTopPage() {
    this.backNavigate.navigate(['/top']);
  }
}
