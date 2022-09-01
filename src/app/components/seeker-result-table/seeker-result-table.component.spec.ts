import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerResultTableComponent } from './seeker-result-table.component';

describe('SeekerResultTableComponent', () => {
  let component: SeekerResultTableComponent;
  let fixture: ComponentFixture<SeekerResultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekerResultTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekerResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
