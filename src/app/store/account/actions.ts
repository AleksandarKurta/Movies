import { createAction, props } from '@ngrx/store';
import { RatingInterface } from 'src/app/types/account/rating.interface';

export const getRatedMovies = createAction(
  '[Account] Get Rated Movies',
  props<{ userId: number; page: number }>()
);

export const getRatedMoviesSuccess = createAction(
  '[Account] Get Rated Movies Success',
  props<{ ratings: Array<RatingInterface> }>()
);

export const getRatingsFailure = createAction(
  '[Account] Get Rated Movies Failure',
  props<{ error: string }>()
);

export const rateMovie = createAction(
  '[Account] Rate Movie',
  props<{ rating: RatingInterface }>()
);
