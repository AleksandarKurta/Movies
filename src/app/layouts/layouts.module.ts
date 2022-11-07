import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default/default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MoviesComponent } from '../modules/movies/movies.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/movies/reducers';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from '../store/movies/effects';

@NgModule({
  declarations: [DefaultComponent, MoviesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    StoreModule.forFeature('movies', reducers),
    EffectsModule.forFeature([MoviesEffects]),
  ],
})
export class LayoutsModule {}
