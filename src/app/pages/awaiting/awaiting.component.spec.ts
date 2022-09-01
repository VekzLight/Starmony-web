import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingComponent } from './awaiting.component';

describe('AwaitingComponent', () => {
  let component: AwaitingComponent;
  let fixture: ComponentFixture<AwaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
