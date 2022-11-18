import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/state/appState.interface';

export const selectFeature = (state: AppStateInterface) => {
  return state.auth;
};

export const sessionSelector = createSelector(selectFeature, (state: any) => {
  return state.session;
});

export const sessionIdSelector = createSelector(selectFeature, (state: any) => {
  return state.sessionId;
});
