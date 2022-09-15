import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorScaleComponent } from './generator-scale.component';

describe('GeneratorScaleComponent', () => {
  let component: GeneratorScaleComponent;
  let fixture: ComponentFixture<GeneratorScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
