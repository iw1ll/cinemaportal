import { Component, input } from '@angular/core';
import { PersonDetail } from '../../../interfaces/actors.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actor-detail',
  imports: [DatePipe],
  templateUrl: './actor-detail.html',
  styleUrl: './actor-detail.scss',
})
export class ActorDetailComponent {
   person = input.required<PersonDetail>();
   /** Нужны правки месяцев и падежи для лет(мб сервис)
    * Мб позже добавим фильтры по годам и жанрам
   */
}
