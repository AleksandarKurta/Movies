import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-score',
  templateUrl: './user-score.component.html',
  styleUrls: ['./user-score.component.scss'],
})
export class UserScoreComponent implements OnInit {
  score!: number;

  @Input() voteAverage!: number;

  constructor() {}

  ngOnInit(): void {
    this.getScore();
  }

  getScore(): void {
    const numRounded = Math.round(this.voteAverage * 10) / 10;
    const roundedStr = numRounded.toString().replace('.', '');
    this.score = ~~roundedStr;
  }
}
