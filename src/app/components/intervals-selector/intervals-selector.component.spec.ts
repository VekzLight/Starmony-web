import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalsSelectorComponent } from './intervals-selector.component';

describe('IntervalsSelectorComponent', () => {
  let component: IntervalsSelectorComponent;
  let fixture: ComponentFixture<IntervalsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalsSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
