import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizerProgressionComponent } from './analizer-progression.component';

describe('AnalizerProgressionComponent', () => {
  let component: AnalizerProgressionComponent;
  let fixture: ComponentFixture<AnalizerProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizerProgressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizerProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
