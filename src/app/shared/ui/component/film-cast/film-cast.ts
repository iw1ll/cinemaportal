import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffMember } from '../../../interfaces/top-films.interface';
import { LoaderComponent } from '../loader/loader';
import { ActorService } from '../../../services/actor-api.service';

@Component({
  selector: 'app-film-cast',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './film-cast.html',
  styleUrl: './film-cast.scss',
})
export class FilmCastComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private actorService = inject(ActorService);

  staff = signal<StaffMember[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.actorService.getStaff(id).subscribe(data => {
      this.staff.set(data);
      this.loading.set(false);
    });
  }

}
