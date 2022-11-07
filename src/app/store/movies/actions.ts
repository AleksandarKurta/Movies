import { createAction, props } from '@ngrx/store';
import { MovieInterface } from 'src/app/types/movies/movie.interface';

export const getMovies = createAction('[Movies] Get Movies');

export const getMoviesSuccess = createAction(
  '[Movies] Get Movies success',
  props<{ movies: MovieInterface[] }>()
);

export const getMoviesFailure = createAction(
  '[Movies] Get Movies failure',
  props<{ error: string }>()
);
