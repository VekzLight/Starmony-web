import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizerChordComponent } from './recognizer-chord.component';

describe('RecognizerChordComponent', () => {
  let component: RecognizerChordComponent;
  let fixture: ComponentFixture<RecognizerChordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognizerChordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizerChordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
