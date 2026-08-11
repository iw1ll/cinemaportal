import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmRecomended } from './film-recomended';

describe('FilmRecomended', () => {
  let component: FilmRecomended;
  let fixture: ComponentFixture<FilmRecomended>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmRecomended]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmRecomended);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
