import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilmDetail } from '../../../shared/interfaces/top-films.interface';
import { TopService } from '../../../shared/services/top-service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-film-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-film-detail.component.html',
  styleUrl: './top-film-detail.component.scss',
})
export class TopFilmDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private topService = inject(TopService);
  private backNavigate = inject(Router);
  film = signal<FilmDetail | null>(null);

  getCountries(): string {
    const f = this.film();
    if ( f!== null) {
      return f.countries?.map((c: { country: string }) => c.country).join(', ') ?? '';
    } else {
      return '';
    }
  }

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
