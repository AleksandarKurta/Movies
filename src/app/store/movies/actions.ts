import { createAction, props } from '@ngrx/store';
import { MovieInterface } from 'src/app/types/movies/movie.interface';

export const getMovies = createAction(
  '[Movies] Get Movies',
  props<{ page: number; category: string; scroll: boolean }>()
);

export const getMoviesSuccess = createAction(
  '[Movies] Get Movies success',
  props<{ movies: MovieInterface[]; scroll: boolean }>()
);

export const getMoviesFailure = createAction(
  '[Movies] Get Movies failure',
  props<{ error: string }>()
);

export const searchMovies = createAction(
  '[Movies] Search Movies',
  props<{ query: string }>()
);

export const searchMoviesSuccess = createAction(
  '[Movies] Search Movies success',
  props<{ movies: MovieInterface[] }>()
);
