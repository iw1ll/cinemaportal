import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../../../services/film-api-service';
import { StaffMember } from '../../../interfaces/top-films.interface';
import { LoaderComponent } from '../loader/loader';

@Component({
  selector: 'app-film-cast',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './film-cast.html',
  styleUrl: './film-cast.scss',
})
export class FilmCastComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private filmService = inject(FilmService);

  staff = signal<StaffMember[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.filmService.getStaff(id).subscribe(data => {
      this.staff.set(data);
      this.loading.set(false);
    });
  }

}
