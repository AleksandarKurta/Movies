import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Subscription } from 'rxjs';
import { Actor } from 'src/app/types/actors/actor.interface';

@Component({
  selector: 'app-movie-actors',
  templateUrl: './movie-actors.component.html',
  styleUrls: ['./movie-actors.component.scss'],
})
export class MovieActorsComponent implements OnInit {
  public actors: Array<Actor> = [];
  private movieCreditsSub!: Subscription;
  @Input() movieId!: number;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieCreditsSub = this.movieService
      .movieCredits(this.movieId)
      .subscribe((credits: any) => {
        this.actors = credits.cast;
      });
  }

  actorImage(profile_path: string): string {
    return profile_path
      ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${profile_path}`
      : 'https://winnipegmetroregion.ca/static/img/default_notfound_img.jpg';
  }

  ngOnDestroy(): void {
    if (this.movieCreditsSub) {
      this.movieCreditsSub.unsubscribe();
    }
  }
}
