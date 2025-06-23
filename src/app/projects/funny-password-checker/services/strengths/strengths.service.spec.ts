import { TestBed, inject } from '@angular/core/testing';

import { StrengthsService } from './strengths.service';

describe('StrengthsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrengthsService]
    });
  });

  it('should be created', inject([StrengthsService], (service: StrengthsService) => {
    expect(service).toBeTruthy();
  }));
});
