import { Routes } from '@angular/router';
import { MoviesComponent } from './project/components/pages/movies/movies.component';
import { SeriesComponent } from './project/components/pages/series/series.component';
import { AnimeComponent } from './project/components/pages/anime/anime.component';
import { CartoonsComponent } from './project/components/pages/cartoons/cartoons.component';
import { LayoutComponent } from './project/layout/layout/layout.component';
import { MainComponent } from './project/components/pages/main/main.component';
import { TopFilmComponent } from './project/components/pages/top/top.component';
import { TopFilmDetailComponent } from './project/components/pages/top-film-detail/top-film-detail.component';
import { FilmCastComponent } from './shared/ui/component/film-cast/film-cast';
import { ActorComponent } from './project/components/pages/actor/actor.component';
import { RegisterComponent } from './project/components/pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './project/components/pages/login/login.component';

/**
 * Маршруты приложения
 */
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [authGuard],
      },
      {
        path: 'top',
        component: TopFilmComponent,
      },
      {
        path: 'film/:id',
        component: TopFilmDetailComponent,
        canActivate: [authGuard],
      },
      {
        path: 'film/:id/cast',
        component: FilmCastComponent,
        canActivate: [authGuard],
      },
      {
        path: 'actor/:id',
        component: ActorComponent,
        canActivate: [authGuard],
      },
      {
        path: 'movies',
        component: MoviesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'series',
        component: SeriesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'anime',
        component: AnimeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'cartoons',
        component: CartoonsComponent,
        canActivate: [authGuard],
      },
      { path: '**', redirectTo: '/login' },
    ],
  },
];
