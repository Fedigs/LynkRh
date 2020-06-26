import { TestBed, inject } from '@angular/core/testing';

import { LynkService } from './lynk.service';

describe('LynkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LynkService]
    });
  });

  it('should be created', inject([LynkService], (service: LynkService) => {
    expect(service).toBeTruthy();
  }));
});
