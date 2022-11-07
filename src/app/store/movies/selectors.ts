import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/appState.interface";

export const selectFeature = (state: AppStateInterface) => state.movies;

export const statusSelector = createSelector(
  selectFeature,
  (state: any) => state.status
);

export const moviesSelector = createSelector(
  selectFeature,
  (state: any) => state.movies
);

export const errorSelector = createSelector(
  selectFeature,
  (state: any) => state.error
);
