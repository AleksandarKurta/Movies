import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from '../modules/movies/movies.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import * as Movie from '../store/movies/reducers';
import * as Auth from '../store/auth/reducers';
import * as Account from '../store/account/reducers';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from '../store/movies/effects';
import { AccountsEffects } from '../store/account/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MovieDetailsComponent } from '../modules/movie-details/movie-details.component';
import { MovieCategoriesComponent } from '../modules/movie-categories/movie-categories.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RatingComponent } from '../shared/components/rating/rating.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieActorsComponent } from '../modules/movie-actors/movie-actors.component';
import { SimilarMoviesComponent } from '../modules/similar-movies/similar-movies.component';
import { UserScoreComponent } from '../modules/user-score/user-score.component';
import { TruncateTextPipe } from '../pipes/truncate-text.pipe';

@NgModule({
  declarations: [
    DefaultComponent,
    MoviesComponent,
    MovieCategoriesComponent,
    MovieDetailsComponent,
    RatingComponent,
    MovieActorsComponent,
    SimilarMoviesComponent,
    UserScoreComponent,
    TruncateTextPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature('movies', Movie.reducers),
    StoreModule.forFeature('auth', Auth.reducers),
    StoreModule.forFeature('account', Account.reducers),
    EffectsModule.forFeature([MoviesEffects, AccountsEffects]),
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class LayoutsModule {}
