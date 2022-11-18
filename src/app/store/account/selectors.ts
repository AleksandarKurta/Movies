import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/state/appState.interface';

export const selectFeature = (state: AppStateInterface) => {
  return state.account;
};

export const ratedMovieSelector = (id: number) =>
  createSelector(selectFeature, (state: any) => {
    let ratings = state.ratings;

    if (!state.ratings.length) {
      ratings = JSON.parse(localStorage.getItem('ratings') || '');
    }

    return ratings.find((item: any) => {
      return item.id === id;
    });
  });
