import { TestBed } from '@angular/core/testing';

import { InterceptorLoaderService } from './interceptor-loader.service';

describe('InterceptorLoaderService', () => {
  let service: InterceptorLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
