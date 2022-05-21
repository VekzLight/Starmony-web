import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizerScaleComponent } from './recognizer-scale.component';

describe('RecognizerScaleComponent', () => {
  let component: RecognizerScaleComponent;
  let fixture: ComponentFixture<RecognizerScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognizerScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizerScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
