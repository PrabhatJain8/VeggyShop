import { TestBed } from '@angular/core/testing';

import { VegetableService } from './vegetable.service';

describe('VegetableService', () => {
  let service: VegetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VegetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
