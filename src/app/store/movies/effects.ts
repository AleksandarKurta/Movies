import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MoviesService } from 'src/app/services/movies.service';
import * as MoviesActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions, private movieService: MoviesService) {}

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovies),
      mergeMap((data) => {
        return this.movieService.getMoviesList(data.page, data.category).pipe(
          map((movies: any) => {
            return MoviesActions.getMoviesSuccess({
              movies: movies,
              scroll: data.scroll,
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
      mergeMap((data) => {
        return this.movieService.searchMovies(data.query).pipe(
          map((movies: any) => {
            return MoviesActions.searchMoviesSuccess({
              movies: movies,
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
