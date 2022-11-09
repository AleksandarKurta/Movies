import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { MovieDetailsComponent } from './modules/movie-details/movie-details.component';
import { MoviesComponent } from './modules/movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'popular', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'popular',
        component: MoviesComponent,
      },
      {
        path: 'top-rated',
        component: MoviesComponent,
      },
      {
        path: 'upcoming',
        component: MoviesComponent,
      },
      {
        path: 'movie/:id',
        component: MovieDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
