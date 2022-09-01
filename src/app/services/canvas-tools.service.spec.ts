import { TestBed } from '@angular/core/testing';

import { CanvasToolsService } from './canvas-tools.service';

describe('CanvasToolsService', () => {
  let service: CanvasToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
