import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}

  getRatings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.getRatedMovies),
      mergeMap(({ userId, page }) => {
        return this.accountService.getRatedMovies(userId, page).pipe(
          map((resp: any) => {
            return AccountActions.getRatedMoviesSuccess({
              ratings: resp.results,
            });
          }),
          catchError((error) =>
            of(AccountActions.getRatingsFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
