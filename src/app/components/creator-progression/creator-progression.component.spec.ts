import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorProgressionComponent } from './creator-progression.component';

describe('CreatorProgressionComponent', () => {
  let component: CreatorProgressionComponent;
  let fixture: ComponentFixture<CreatorProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorProgressionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
