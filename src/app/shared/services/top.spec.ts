import { TestBed } from '@angular/core/testing';

import { Top } from './top';

describe('Top', () => {
  let service: Top;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Top);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
