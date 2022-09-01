import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizerComponent } from './analizer.component';

describe('AnalizerComponent', () => {
  let component: AnalizerComponent;
  let fixture: ComponentFixture<AnalizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
