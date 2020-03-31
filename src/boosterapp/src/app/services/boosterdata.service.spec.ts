import { TestBed } from '@angular/core/testing';

import { BoosterdataService } from './boosterdata.service';

describe('BoosterdataService', () => {
  let service: BoosterdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoosterdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
