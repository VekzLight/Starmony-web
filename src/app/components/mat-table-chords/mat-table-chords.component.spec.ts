import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableChordsComponent } from './mat-table-chords.component';

describe('MatTableChordsComponent', () => {
  let component: MatTableChordsComponent;
  let fixture: ComponentFixture<MatTableChordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableChordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableChordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
