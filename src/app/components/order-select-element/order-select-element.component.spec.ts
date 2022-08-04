import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSelectElementComponent } from './order-select-element.component';

describe('OrderSelectElementComponent', () => {
  let component: OrderSelectElementComponent;
  let fixture: ComponentFixture<OrderSelectElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSelectElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSelectElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
