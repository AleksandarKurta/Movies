import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MoviesService } from 'src/app/services/movies.service';
import * as MoviesActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MoviesEffects {

  constructor(private actions$: Actions, private movieService: MoviesService) {};

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovies),
      mergeMap(() => {
        return this.movieService.getMoviesList().pipe(
          map((movies) => MoviesActions.getMoviesSuccess({ movies })),
          catchError((error) =>
            of(MoviesActions.getMoviesFailure({ error: error.message }))
          )
        )
      })
    )
  );
}
