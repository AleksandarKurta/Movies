import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MoviesActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private moviesService: MoviesService
  ) {}

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovies),
      mergeMap(({ page, category, scroll }) => {
        return this.moviesService.getMoviesList(page, category).pipe(
          map((movies: any) => {
            return MoviesActions.getMoviesSuccess({
              movies: movies,
              scroll: scroll,
            });
          }),
          catchError((error) =>
            of(MoviesActions.getMoviesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  searchMovies = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.searchMovies),
      mergeMap(({ query, page, scroll }) => {
        return this.moviesService.searchMovies(query, page).pipe(
          map((movies: any) => {
            return MoviesActions.searchMoviesSuccess({
              movies: movies,
              scroll: scroll,
            });
          }),
          catchError((error) =>
            of(MoviesActions.getMoviesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
