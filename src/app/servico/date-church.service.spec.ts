import { TestBed } from '@angular/core/testing';

import { DateChurchService } from './date-church.service';

describe('DateChurchService', () => {
  let service: DateChurchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateChurchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
