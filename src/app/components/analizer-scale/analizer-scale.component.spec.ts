import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizerScaleComponent } from './analizer-scale.component';

describe('AnalizerScaleComponent', () => {
  let component: AnalizerScaleComponent;
  let fixture: ComponentFixture<AnalizerScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizerScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizerScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
