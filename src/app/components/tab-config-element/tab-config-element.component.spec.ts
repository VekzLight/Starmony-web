import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConfigElementComponent } from './tab-config-element.component';

describe('TabConfigElementComponent', () => {
  let component: TabConfigElementComponent;
  let fixture: ComponentFixture<TabConfigElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabConfigElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConfigElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
