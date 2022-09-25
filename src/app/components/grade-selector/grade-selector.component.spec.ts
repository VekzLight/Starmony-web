import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSelectorComponent } from './grade-selector.component';

describe('GradeSelectorComponent', () => {
  let component: GradeSelectorComponent;
  let fixture: ComponentFixture<GradeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
