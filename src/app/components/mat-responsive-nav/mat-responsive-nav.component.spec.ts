import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatResponsiveNavComponent } from './mat-responsive-nav.component';

describe('MatResponsiveNavComponent', () => {
  let component: MatResponsiveNavComponent;
  let fixture: ComponentFixture<MatResponsiveNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatResponsiveNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatResponsiveNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
