import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNotesComponent } from './config-notes.component';

describe('ConfigNotesComponent', () => {
  let component: ConfigNotesComponent;
  let fixture: ComponentFixture<ConfigNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
