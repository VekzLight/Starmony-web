import { TestBed } from '@angular/core/testing';

import { ElementsContainerService } from './elements-container.service';

describe('ElementsContainerService', () => {
  let service: ElementsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
