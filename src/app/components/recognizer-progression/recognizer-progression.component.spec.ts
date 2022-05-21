import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizerProgressionComponent } from './recognizer-progression.component';

describe('RecognizerProgressionComponent', () => {
  let component: RecognizerProgressionComponent;
  let fixture: ComponentFixture<RecognizerProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecognizerProgressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizerProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
