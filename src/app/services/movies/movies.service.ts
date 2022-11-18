import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { endpoints } from 'src/app/endpoints/endpoints';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/types/api/api-response.interface';
import { MovieInterface } from 'src/app/types/movies/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  findEndpoint(page: number, category: string): string {
    switch (category) {
      case 'top-rated':
        return `${endpoints.TOP_RATED}?page=${page}`;
      case 'upcoming':
        return `${endpoints.UPCOMING}?page=${page}`;
      default:
        return `${endpoints.POPULAR}?page=${page}`;
    }
  }

  getMoviesList(
    page: number,
    category: string
  ): Observable<APIResponse<MovieInterface>> {
    const endpoint = this.findEndpoint(page, category);

    return this.http.get(endpoint).pipe(
      map((data: any) => {
        return data.results.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            imgSrc: item.poster_path
              ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`
              : 'https://winnipegmetroregion.ca/static/img/default_notfound_img.jpg',
            releaseDate: item.release_date,
          };
        });
      })
    );
  }

  searchMovies(query: string, page: number): Observable<Object> {
    return this.http
      .get(`${endpoints.SEARCH}?page=${page}`, {
        params: {
          query,
        },
      })
      .pipe(
        map((data: any) => {
          return data.results.map((item: any) => {
            return {
              id: item.id,
              title: item.title,
              imgSrc: item.poster_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`
                : 'https://winnipegmetroregion.ca/static/img/default_notfound_img.jpg',
              releaseDate: item.release_date,
            };
          });
        })
      );
  }
}
