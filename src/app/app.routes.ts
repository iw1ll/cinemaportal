import { Routes } from '@angular/router';
import { MoviesComponent } from './project/components/movies/movies';
import { SeriesComponent } from './project/components/series/series';
import { AnimeComponent } from './project/components/anime/anime';
import { CartoonsComponent } from './project/components/cartoons/cartoons';
import { LayoutComponent } from './project/layout/layout/layout';
import { MainComponent } from './project/components/main/main';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'anime', component: AnimeComponent },
      { path: 'cartoons', component: CartoonsComponent },
      { path: '**', redirectTo: '/main' },
    ],
  },
];
