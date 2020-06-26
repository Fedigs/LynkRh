import { TestBed, inject } from '@angular/core/testing';

import { CandidatService } from './candidat.service';

describe('CandidatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatService]
    });
  });

  it('should be created', inject([CandidatService], (service: CandidatService) => {
    expect(service).toBeTruthy();
  }));
});
