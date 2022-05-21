import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorScaleComponent } from './creator-scale.component';

describe('CreatorScaleComponent', () => {
  let component: CreatorScaleComponent;
  let fixture: ComponentFixture<CreatorScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorScaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
