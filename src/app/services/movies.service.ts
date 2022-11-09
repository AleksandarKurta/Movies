import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../endpoints/endpoints';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  getMoviesList(page: number, category: string) {
    const endpoint = this.findEndpoint(page, category);

    return this.http.get(endpoint).pipe(
      map((data: any) => {
        return data.results.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            imgSrc: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.backdrop_path}`,
            releaseDate: item.release_date,
          };
        });
      })
    );
  }

  searchMovies(query: string) {
    return this.http
      .get(endpoints.SEARCH, {
        params: {
          query,
        },
      })
      .pipe(
        map((data: any) => {
          console.log('data', data);
          return data.results.map((item: any) => {
            return {
              title: item.title,
              imgSrc: item.backdrop_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${item.backdrop_path}`
                : 'https://winnipegmetroregion.ca/static/img/default_notfound_img.jpg',
              releaseDate: item.release_date,
            };
          });
        })
      );
  }
}
