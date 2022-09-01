import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizerChordComponent } from './analizer-chord.component';

describe('AnalizerChordComponent', () => {
  let component: AnalizerChordComponent;
  let fixture: ComponentFixture<AnalizerChordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalizerChordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizerChordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
