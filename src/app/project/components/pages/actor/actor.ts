import { Component, inject, OnInit, signal } from '@angular/core';
import { ActorService } from '../../../../shared/services/actor-api.service';
import { ActivatedRoute } from '@angular/router';
import { PersonDetail } from '../../../../shared/interfaces/actors.interface';
import { PageState } from '../../../../shared/types/state.type';
import { LoaderComponent } from '../../../../shared/ui/component/loader/loader';
import { ActorDetailComponent } from '../../../../shared/ui/component/actor-detail/actor-detail';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-actor',
  imports: [ActorDetailComponent, LoaderComponent],
  templateUrl: './actor.html',
  styleUrl: './actor.scss',
})
export class ActorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private actorService = inject(ActorService);

  person = signal<PersonDetail | null>(null);
  state = signal<PageState>('loading');

  ngOnInit(): void {
    this.getPersonById();
  }

  getPersonById() {
    const id = this.route.snapshot.params['id'];
    this.actorService.getPersonById(id).pipe(
      tap((actor) => {
        this.person.set(actor);
        this.state.set('success');
      }),
      catchError(() => {
        this.state.set('error');
        return of(null);
      })
    ).subscribe()
  }
}
