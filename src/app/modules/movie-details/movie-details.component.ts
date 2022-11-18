import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie/movie.service';
import { StarRatingColor } from 'src/app/enums/star-rating-color.enum';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/state/appState.interface';
import { sessionIdSelector } from 'src/app/store/auth/selectors';
import { sessionSelector } from 'src/app/store/auth/selectors';
import { ratedMovieSelector } from 'src/app/store/account/selectors';
import { Subscription } from 'rxjs';
import * as AccountAction from '../../store/account/actions';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieId!: number;
  genres!: [];
  session!: string;
  sessionId!: string;
  sessionIdSub!: Subscription;
  sessionSub!: Subscription;
  rating!: number;
  rateMovieSub!: Subscription;
  starCount: number = 10;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;
  movieDetailsSub!: Subscription;
  ratedMovieSelectorSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((data) => {
      this.movieId = ~~data[1].path;
    });

    this.movieDetailsSub = this.movieService
      .movieDetails(this.movieId)
      .pipe(delay(1000))
      .subscribe((movie: any) => {
        this.movie = movie;
        this.getGenres();
      });

    this.sessionSub = this.store
      .pipe(select(sessionSelector))
      .subscribe((session) => (this.session = session));

    this.ratedMovieSelectorSub = this.store
      .pipe(select(ratedMovieSelector(this.movieId)))
      .subscribe((resp) => {
        this.rating = resp?.rating;
      });
  }

  getGenres(): void {
    this.genres = this.movie.genres.map((genre: any) => genre.name);
  }

  bgImg(): object {
    return {
      'background-image': `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${this.movie.backdrop_path})`,
    };
  }

  onRatingChanged(rating: number): void {
    this.rating = rating;

    this.sessionIdSub = this.store
      .pipe(select(sessionIdSelector))
      .subscribe((sessionId) => (this.sessionId = sessionId));

    this.rateMovieSub = this.movieService
      .rateMovie(this.movieId, this.rating, this.sessionId)
      .subscribe();

    this.store.dispatch(
      AccountAction.rateMovie({
        rating: {
          id: this.movieId,
          rating: this.rating,
        },
      })
    );
  }

  ngOnDestroy(): void {
    if (this.sessionIdSub) {
      this.sessionIdSub.unsubscribe();
    }
    if (this.rateMovieSub) {
      this.rateMovieSub.unsubscribe();
    }
    if (this.movieDetailsSub) {
      this.movieDetailsSub.unsubscribe();
    }
    if (this.sessionSub) {
      this.sessionSub.unsubscribe();
    }
    if (this.ratedMovieSelectorSub) {
      this.ratedMovieSelectorSub.unsubscribe();
    }
  }
}
