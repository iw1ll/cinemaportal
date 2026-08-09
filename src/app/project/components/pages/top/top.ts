import { Component, inject, OnInit, signal } from '@angular/core';
import { TopService } from '../../../../shared/services/top-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../../../shared/interfaces/top-films.interface';
import { PaginationComponent } from '../../../../shared/ui/component/pagination/pagination.component';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-top',
  imports: [PaginationComponent],
  templateUrl: './top.html',
  styleUrl: './top.scss',
})
export class TopFilmComponent implements OnInit {
  topService = inject(TopService);
  topFilms = signal<Film[]>([]);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentPage = signal(1);
  totalPages = signal(1);
  loading = signal(false);

  ngOnInit(): void {
    const page = Number(this.route.snapshot.queryParams['page']) || 1;
    this.getTopFilms(page);
  }


  getTopFilms(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      replaceUrl: true,
    });

    this.loading.set(true);
    this.currentPage.set(page);

    this.topService.getTopFilms(page).pipe(
      tap(response => {
        this.topFilms.set(response.items);
        this.totalPages.set(response.totalPages);
    }),
      finalize(() => {
        this.loading.set(false);
      })
    ).subscribe();
  }

  goToFilm(filmId: number): void {
    this.router.navigate(['/film', filmId], {
      queryParams: { fromPage: this.currentPage() }
    });
  }


  prevPage(): void {
    if (this.currentPage() > 1) {
      this.getTopFilms(this.currentPage() - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.getTopFilms(this.currentPage() + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
