import { createAction, props } from '@ngrx/store';

export const getSession = createAction(
  '[Session] Get Session',
  props<{ session: boolean; sessionId: string | null }>()
);
