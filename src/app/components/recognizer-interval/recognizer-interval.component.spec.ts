import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizerIntervalComponent } from './recognizer-interval.component';

describe('RecognizerIntervalComponent', () => {
  let component: RecognizerIntervalComponent;
  let fixture: ComponentFixture<RecognizerIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognizerIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizerIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
