import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FilmDetail, TopFilmsResponse } from '../interfaces/top-films.interface';

@Injectable({
  providedIn: 'root',
})
export class TopService {
  http = inject(HttpClient);
  apiUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2';

  getTopFilms(page = 1): Observable<TopFilmsResponse> {
    return this.http.get<TopFilmsResponse>(
      `${this.apiUrl}/films/collections?type=TOP_250_MOVIES&page=${page}`,
      {
        headers: {
          'X-API-KEY': environment.kinopoiskApiKey,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  geDetailsFilms(id: number): Observable<FilmDetail> {
    return this.http
      .get<FilmDetail>(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        headers: { 'X-API-KEY': environment.kinopoiskApiKey },
      });
  }
}
