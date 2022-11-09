import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public subject = new Subject();
  public searchQuery: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.subject
      .pipe(
        map((query) => query),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((query: any) => {
        this.router.navigate([''], {
          queryParams: {
            query,
          },
          queryParamsHandling: 'merge',
        });
      });

    this.searchService.searchQuery$.subscribe((value) => {
      this.searchQuery = value;
    });
  }

  onSearch($event: any) {
    this.subject.next($event.target.value);
  }
}
