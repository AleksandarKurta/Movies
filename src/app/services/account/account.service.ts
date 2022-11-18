import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/state/appState.interface';
import { sessionIdSelector } from 'src/app/store/auth/selectors';
import { API_BASE_URL } from 'src/app/endpoints/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private sessionId: string = '';
  private sessionIdSub: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppStateInterface>
  ) {
    this.sessionIdSub = this.store
      .pipe(select(sessionIdSelector))
      .subscribe((sessionId) => (this.sessionId = sessionId));
  }

  getUserDetails(sessionId: string): Observable<Object> {
    this.sessionId = sessionId;
    return this.http.get(`${API_BASE_URL}/3/account?session_id=${sessionId}`);
  }

  getRatedMovies(userId: number, page: number): Observable<Object> {
    return this.http.get(
      `${API_BASE_URL}/3/account/${userId}/rated/movies?session_id=${this.sessionId}&page=${page}`
    );
  }

  ngOnDestroy(): void {
    if (this.sessionIdSub) {
      this.sessionIdSub.unsubscribe();
    }
  }
}
