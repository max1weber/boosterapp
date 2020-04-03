import { TestBed } from '@angular/core/testing';

import { ApplicationInsightService } from './application-insight.service';

describe('ApplicationInsightService', () => {
  let service: ApplicationInsightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationInsightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
