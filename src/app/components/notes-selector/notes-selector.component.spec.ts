import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSelectorComponent } from './notes-selector.component';

describe('NotesSelectorComponent', () => {
  let component: NotesSelectorComponent;
  let fixture: ComponentFixture<NotesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
