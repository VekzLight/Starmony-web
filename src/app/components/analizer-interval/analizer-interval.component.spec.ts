import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizerIntervalComponent } from './analizer-interval.component';

describe('AnalizerIntervalComponent', () => {
  let component: AnalizerIntervalComponent;
  let fixture: ComponentFixture<AnalizerIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizerIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizerIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
