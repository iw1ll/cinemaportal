import { Routes } from '@angular/router';
import { MoviesComponent } from './project/components/movies/movies';
import { SeriesComponent } from './project/components/series/series';
import { AnimeComponent } from './project/components/anime/anime';
import { CartoonsComponent } from './project/components/cartoons/cartoons';
import { LayoutComponent } from './project/layout/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/movies', pathMatch: 'full' },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'anime', component: AnimeComponent },
      { path: 'cartoons', component: CartoonsComponent },
      { path: '**', redirectTo: '/movies' },
    ],
  },
];
