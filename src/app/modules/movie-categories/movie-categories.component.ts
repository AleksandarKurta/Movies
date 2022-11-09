import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface CategoryInterface {
  label: string;
  value: string;
}

@Component({
  selector: 'app-movie-categories',
  templateUrl: './movie-categories.component.html',
  styleUrls: ['./movie-categories.component.scss'],
})
export class MovieCategoriesComponent implements OnInit {
  public categories: Array<CategoryInterface> = [
    {
      label: 'Popular',
      value: 'popular',
    },
    {
      label: 'Top rated',
      value: 'top-rated',
    },
    {
      label: 'Upcoming',
      value: 'upcoming',
    },
  ];

  public activeCategory: string = 'Movie Categories';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((data) => {
      let category = this.categories.find(
        (category) => category.value === data[0].path
      );

      if (category) {
        this.activeCategory = category.label;
      }
    });
  }
}
