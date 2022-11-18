import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private query$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  searchQuery$: Observable<any> = this.query$.asObservable();

  constructor() {}

  setQuery(query: string): void {
    this.query$.next(query);
  }
}
