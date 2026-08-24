import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationComponent } from '../../../../shared/ui/component/pagination/pagination.component';
import { NgTemplateOutlet } from '@angular/common';
import { LoaderComponent } from '../../../../shared/ui/component/loader/loader';
import { TopFilmsSignalService } from '../../../../shared/services/top-films-signal.service';

@Component({
  selector: 'app-top',
  imports: [PaginationComponent, NgTemplateOutlet, LoaderComponent],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss',
})
export class TopFilmComponent implements OnInit {
  /** Сигнал-сервис: хранит состояние, данные и логику загрузки */
  topFilmsService = inject(TopFilmsSignalService);
  /** Программная навигация */
  private router = inject(Router);
  /** Доступ к query-параметрам URL */
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const page = Number(this.route.snapshot.queryParams['page']) || 1;
    this.topFilmsService.loadFilms(page);
  }

  /** Переход на страницу фильма, сохраняя текущую страницу топа */
  goToFilm(filmId: number): void {
    this.router.navigate(['/film', filmId], {
      queryParams: { fromPage: this.topFilmsService.currentPage() }
    });
  }
}
