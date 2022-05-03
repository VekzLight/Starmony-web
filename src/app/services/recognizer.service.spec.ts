import { TestBed } from '@angular/core/testing';

import { RecognizerService } from './recognizer.service';

describe('RecognizerService', () => {
  let service: RecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
