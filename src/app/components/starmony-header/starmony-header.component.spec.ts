import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarmonyHeaderComponent } from './starmony-header.component';

describe('StarmonyHeaderComponent', () => {
  let component: StarmonyHeaderComponent;
  let fixture: ComponentFixture<StarmonyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarmonyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarmonyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
