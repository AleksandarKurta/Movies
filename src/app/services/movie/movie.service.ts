import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from 'src/app/endpoints/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  movieDetails(id: number): Observable<Object> {
    return this.http.get(`${endpoints.MOVIE}/${id}?append_to_response=rating`);
  }

  movieCredits(id: number): Observable<Object> {
    return this.http.get(`${endpoints.MOVIE}/${id}/credits`);
  }

  similarMovies(id: number): Observable<Object> {
    return this.http.get(`${endpoints.MOVIE}/${id}/similar`);
  }

  rateMovie(
    id: number,
    rating: number,
    sessionId: string | null
  ): Observable<Object> {
    return this.http.post(
      `${endpoints.MOVIE}/${id}/rating?session_id=${sessionId}`,
      {
        value: rating,
      }
    );
  }
}
