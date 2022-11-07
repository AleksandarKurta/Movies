import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../endpoints/endpoints';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../types/movies/apiResponseInterface';
import { MovieInterface } from '../types/movies/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getMoviesList()
  {
    return this.http
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
      );
  }
}
