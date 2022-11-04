import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { endpoints } from '../../endpoints/endpoints';
import { MovieInterface } from '../../types/movies/movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public movies: Array<MovieInterface> = [];
  public movieBackdropPath: string = '';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const t = this.http
      .get(endpoints.POPULAR)
      .pipe(
        map((data: any) => {
          return data.results.map((item: any) => {
            return {
              title: item.title,
              imgSrc: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.backdrop_path}`,
              releaseDate: item.release_date,
            };
          });
        })
      )
      .subscribe((movies: Array<MovieInterface>) => {
        this.movies = movies;
      });
  }
}
