import { Component, OnInit } from '@angular/core';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor(public signalsService: SignalsService) { }

  ngOnInit(): void {
  }

}
