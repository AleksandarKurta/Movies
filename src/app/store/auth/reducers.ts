import { createReducer, on } from '@ngrx/store';
import { SessionStateInterface } from 'src/app/types/auth/sessionState.interface';
import * as AuthActions from './actions';

export const initialState: SessionStateInterface = {
  session: !!localStorage.getItem('sessionId'),
  sessionId: localStorage.getItem('sessionId'),
};

export const reducers = createReducer(
  initialState,
  on(AuthActions.getSession, (state, action) => ({
    ...state,
    session: action.session,
    sessionId: action.sessionId,
  }))
);
