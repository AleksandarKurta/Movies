import { createReducer, on } from '@ngrx/store';
import { MoviesStateInterface } from 'src/app/types/movies/moviesState.interface';
import * as MovieActions from './actions';

export const initialState: MoviesStateInterface = {
  movies: [],
  error: null,
  status: 'pending',
};

export const reducers = createReducer(
  initialState,
  on(MovieActions.getMovies, (state) => ({
    ...state,
    status: 'loading',
  }))
);
