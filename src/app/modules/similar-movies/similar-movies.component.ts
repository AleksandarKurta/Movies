import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Subscription } from 'rxjs';
import { SimilarMovie } from 'src/app/types/similar-movies/similar-movie.interface';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.scss'],
})
export class SimilarMoviesComponent implements OnInit {
  public similarMovies: Array<SimilarMovie> = [];
  private similarMoviesSub!: Subscription;
  @Input() movieId!: number;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.similarMoviesSub = this.movieService
      .similarMovies(this.movieId)
      .subscribe((similarMovies: any) => {
        this.similarMovies = similarMovies.results;
      });
  }

  similarMovieImage(profile_path: any): string {
    return profile_path
      ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${profile_path}`
      : 'https://winnipegmetroregion.ca/static/img/default_notfound_img.jpg';
  }

  ngOnDestroy(): void {
    if (this.similarMoviesSub) {
      this.similarMoviesSub.unsubscribe();
    }
  }
}
