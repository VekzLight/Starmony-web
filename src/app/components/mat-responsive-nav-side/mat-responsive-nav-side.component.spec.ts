import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatResponsiveNavSideComponent } from './mat-responsive-nav-side.component';

describe('MatResponsiveNavSideComponent', () => {
  let component: MatResponsiveNavSideComponent;
  let fixture: ComponentFixture<MatResponsiveNavSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatResponsiveNavSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatResponsiveNavSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
