import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableConcreteChordsComponent } from './mat-table-concrete-chords.component';

describe('MatTableConcreteChordsComponent', () => {
  let component: MatTableConcreteChordsComponent;
  let fixture: ComponentFixture<MatTableConcreteChordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableConcreteChordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableConcreteChordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
