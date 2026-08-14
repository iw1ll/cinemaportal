import { Routes } from '@angular/router';
import { MoviesComponent } from './project/components/pages/movies/movies';
import { SeriesComponent } from './project/components/pages/series/series';
import { AnimeComponent } from './project/components/pages/anime/anime';
import { CartoonsComponent } from './project/components/pages/cartoons/cartoons';
import { LayoutComponent } from './project/layout/layout/layout';
import { MainComponent } from './project/components/pages/main/main';
import { TopFilmComponent } from './project/components/pages/top/top';
import { TopFilmDetailComponent } from './project/components/pages/top-film-detail/top-film-detail.component';
import { FilmCastComponent } from './shared/ui/component/film-cast/film-cast';
import { ActorComponent } from './project/components/pages/actor/actor';
import { RegisterComponent } from './project/components/pages/register/register';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'top', component: TopFilmComponent },
      { path: 'film/:id', component: TopFilmDetailComponent },
      { path: 'film/:id/cast', component: FilmCastComponent },
      { path: 'actor/:id', component: ActorComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'anime', component: AnimeComponent },
      { path: 'cartoons', component: CartoonsComponent },
      { path: '**', redirectTo: '/main' },
    ],
  },
];
