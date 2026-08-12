import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PersonDetail } from '../interfaces/actors.interface';
import { StaffMember } from '../interfaces/top-films.interface';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  /** HTTP-клиент */
  http = inject(HttpClient);
  /** Базовый URL API для работы с персонами */
  apiUrl = 'https://kinopoiskapiunofficial.tech/api/v1';

  /** Детальная информация о персоне (актёр, режиссёр) */
  getPersonById(id: number): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(
      `${this.apiUrl}/staff/${id}`,
      {
        headers: {
          'X-API-KEY': environment.kinopoiskApiKey,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  /** Список актёров и съёмочной группы */
  getStaff(filmId: number): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(
      `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`,
      {
        headers: { 'X-API-KEY': environment.kinopoiskApiKey },
      },
    );
  }
}
