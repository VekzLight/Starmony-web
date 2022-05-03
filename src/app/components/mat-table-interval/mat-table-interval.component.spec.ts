import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableIntervalComponent } from './mat-table-interval.component';

describe('MatTableIntervalComponent', () => {
  let component: MatTableIntervalComponent;
  let fixture: ComponentFixture<MatTableIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
