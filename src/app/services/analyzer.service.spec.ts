import { TestBed } from '@angular/core/testing';

import { AnalyzerService } from './analyzer.service';

describe('AnalyzerService', () => {
  let service: AnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
