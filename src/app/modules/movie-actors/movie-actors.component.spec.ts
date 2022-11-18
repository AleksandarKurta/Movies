import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieActorsComponent } from './movie-actors.component';

describe('MovieActorsComponent', () => {
  let component: MovieActorsComponent;
  let fixture: ComponentFixture<MovieActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieActorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
