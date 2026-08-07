import { Component, input, OnInit } from '@angular/core';
import { FilmDetail } from '../../../interfaces/top-films.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './film-card.html',
  styleUrl: './film-card.scss',
})
export class FilmCard implements OnInit {
  film = input.required<FilmDetail | null>();

  ngOnInit(): void {
    console.log(this.film());
  }

  getCountries(): string {
    const f = this.film();
    if (f !== null) {
      return f.countries?.map((c: { country: string }) => c.country).join(', ') ?? '';
    } else {
      return '';
    }
  }
}
