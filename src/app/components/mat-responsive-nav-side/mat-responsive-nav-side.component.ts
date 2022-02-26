import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mat-responsive-nav-side',
  templateUrl: './mat-responsive-nav-side.component.html',
  styleUrls: ['./mat-responsive-nav-side.component.scss']
})
export class MatResponsiveNavSideComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
