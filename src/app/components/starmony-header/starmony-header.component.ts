import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starmony-header',
  templateUrl: './starmony-header.component.html',
  styleUrls: ['./starmony-header.component.scss']
})
export class StarmonyHeaderComponent implements OnInit {

  @Input("back") back: boolean; 

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  public goBack(): void {
    this.location.back();
  }
}
