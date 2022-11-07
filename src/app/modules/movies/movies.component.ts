import { Component, OnInit } from '@angular/core';
import { MovieInterface } from '../../types/movies/movie.interface';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MovieAction from '../../store/movies/actions';
import { statusSelector, moviesSelector } from 'src/app/store/movies/selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public movieBackdropPath: string = '';
  public status$: Observable<string>;
  public movies$: Observable<MovieInterface[]>;

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.status$ = this.store.pipe(select(statusSelector));
    this.movies$ = this.store.pipe(select(moviesSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(MovieAction.getMovies());
  }
}
