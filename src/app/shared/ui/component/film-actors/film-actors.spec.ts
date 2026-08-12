import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmActors } from './film-actors';

describe('FilmActors', () => {
  let component: FilmActors;
  let fixture: ComponentFixture<FilmActors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmActors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmActors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
