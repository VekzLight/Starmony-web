import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mat-responsive-nav-header',
  templateUrl: './mat-responsive-nav-header.component.html',
  styleUrls: ['./mat-responsive-nav-header.component.scss']
})
export class MatResponsiveNavHeaderComponent implements OnInit {

  @Output() public sidenavToogle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => {
    this.sidenavToogle.emit();
  }
}
