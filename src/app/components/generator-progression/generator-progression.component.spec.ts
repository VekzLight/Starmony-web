import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorProgressionComponent } from './generator-progression.component';

describe('GeneratorProgressionComponent', () => {
  let component: GeneratorProgressionComponent;
  let fixture: ComponentFixture<GeneratorProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorProgressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
