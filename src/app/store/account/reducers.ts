import { createReducer, on } from '@ngrx/store';
import { AccountStateInterface } from 'src/app/types/account/accountState.interface';
import { RatingInterface } from 'src/app/types/account/rating.interface';
import * as AccountAction from './actions';

export const initialState: AccountStateInterface = {
  ratings: [],
};

export const reducers = createReducer(
  initialState,
  on(AccountAction.getRatedMovies, (state, action) => ({
    ...state,
  })),
  on(AccountAction.getRatedMoviesSuccess, (state, action) => ({
    ...state,
    ratings: persistRatings(action.ratings),
  })),
  on(AccountAction.getRatingsFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AccountAction.rateMovie, (state, action) => ({
    ...state,
    ratings: persistRatings(updateOrCreateRating(state, action)),
  }))
);

function updateOrCreateRating(state: AccountStateInterface, action: any) {
  const foundIndex = state.ratings.findIndex(
    (item) => item.id == action.rating.id
  );

  if (foundIndex === -1) {
    return [...state.ratings, action.rating];
  }

  const newState = [...state.ratings];

  newState[foundIndex] = action.rating;
  return newState;
}

function persistRatings(ratings: any) {
  localStorage.setItem('ratings', JSON.stringify(ratings));

  return ratings;
}
