import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatResponsiveNavHeaderComponent } from './mat-responsive-nav-header.component';

describe('MatResponsiveNavHeaderComponent', () => {
  let component: MatResponsiveNavHeaderComponent;
  let fixture: ComponentFixture<MatResponsiveNavHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatResponsiveNavHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatResponsiveNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
