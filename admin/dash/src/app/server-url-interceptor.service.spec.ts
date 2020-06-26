import { TestBed, inject } from '@angular/core/testing';

import { ServerUrlInterceptorService } from './server-url-interceptor.service';

describe('ServerUrlInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerUrlInterceptorService]
    });
  });

  it('should be created', inject([ServerUrlInterceptorService], (service: ServerUrlInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
