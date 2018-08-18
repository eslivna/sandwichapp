import { TestBed, inject } from '@angular/core/testing';

import { SandwichDataService } from './sandwich-data.service';

describe('SandwichDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SandwichDataService]
    });
  });

  it('should be created', inject([SandwichDataService], (service: SandwichDataService) => {
    expect(service).toBeTruthy();
  }));
});
