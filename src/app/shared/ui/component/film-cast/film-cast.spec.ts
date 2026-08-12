import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCast } from './film-cast';

describe('FilmCast', () => {
  let component: FilmCast;
  let fixture: ComponentFixture<FilmCast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
