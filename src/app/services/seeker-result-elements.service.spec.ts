import { TestBed } from '@angular/core/testing';

import { SeekerResultElementsService } from './seeker-result-elements.service';

describe('SeekerResultElementsService', () => {
  let service: SeekerResultElementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeekerResultElementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
