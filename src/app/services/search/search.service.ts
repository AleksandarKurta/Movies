import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private query$ = new BehaviorSubject<any>('');
  searchQuery$ = this.query$.asObservable();

  constructor() {}

  setQuery(query: string): void {
    this.query$.next(query);
  }
}
