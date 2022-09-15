import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorGuiComponent } from './generator-gui.component';

describe('GeneratorGuiComponent', () => {
  let component: GeneratorGuiComponent;
  let fixture: ComponentFixture<GeneratorGuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratorGuiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorGuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
