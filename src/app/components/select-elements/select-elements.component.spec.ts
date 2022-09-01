import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectElementsComponent } from './select-elements.component';

describe('SelectElementsComponent', () => {
  let component: SelectElementsComponent;
  let fixture: ComponentFixture<SelectElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
