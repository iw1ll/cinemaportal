import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TopService {
  http = inject(HttpClient);
  apiUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2';

  getTopFilms(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '/films/top?type=TOP_250_BEST_FILMS&page=1',
      {
        headers: {
          'X-API-KEY': environment.kinopoiskApiKey,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
