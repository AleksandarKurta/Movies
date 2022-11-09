import { Component, OnInit } from '@angular/core';
import { MovieInterface } from '../../types/movies/movie.interface';
import { select, Store } from '@ngrx/store';
import * as MovieAction from '../../store/movies/actions';
import { statusSelector, moviesSelector } from 'src/app/store/movies/selectors';
import { AppStateInterface } from 'src/app/types/appState.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public status: string = '';
  public movies: Array<MovieInterface> = [];
  public page: number = 1;
  public category: string = '';
  public scroll: boolean = false;
  public query: string = '';
  public moviesSub: Subscription;
  public statusSub: Subscription;

  constructor(
    private store: Store<AppStateInterface>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {
    this.moviesSub = this.store
      .pipe(select(moviesSelector))
      .subscribe((movies) => (this.movies = movies));
    this.statusSub = this.store
      .pipe(select(statusSelector))
      .subscribe((data) => (this.status = data));
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((data) => {
      this.category = data[0].path;
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.query = params['query'];
      if (this.query) {
        this.searchMovies();
      }

      if (this.query === '') {
        this.getMovies();
      }
    });

    if (!this.query) {
      this.getMovies();
      this.clearQueryParams();
    }
  }

  onScroll(): void {
    this.page++;
    this.scroll = true;
    this.getMovies();
  }

  getMovies() {
    this.store.dispatch(
      MovieAction.getMovies({
        page: this.page,
        category: this.category,
        scroll: this.scroll,
      })
    );
  }

  searchMovies() {
    this.store.dispatch(
      MovieAction.searchMovies({
        query: this.query,
      })
    );
  }

  clearQueryParams(): void {
    this.searchService.setQuery('');
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    if (this.moviesSub) {
      this.moviesSub.unsubscribe();
    }
    if (this.statusSub) {
      this.statusSub.unsubscribe();
    }
  }
}
