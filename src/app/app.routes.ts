import { Routes } from '@angular/router';
import { MoviesComponent } from './project/components/pages/movies/movies';
import { SeriesComponent } from './project/components/pages/series/series';
import { AnimeComponent } from './project/components/pages/anime/anime';
import { CartoonsComponent } from './project/components/pages/cartoons/cartoons';
import { LayoutComponent } from './project/layout/layout/layout';
import { MainComponent } from './project/components/pages/main/main';
import { TopFilmComponent } from './project/components/pages/top/top';
import { TopFilmDetailComponent } from './project/components/top-film-detail/top-film-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'top', component: TopFilmComponent },
      { path: 'film/:id', component: TopFilmDetailComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'anime', component: AnimeComponent },
      { path: 'cartoons', component: CartoonsComponent },
      { path: '**', redirectTo: '/main' },
    ],
  },
];
