import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-generator-gui',
  templateUrl: './generator-gui.component.html',
  styleUrls: ['./generator-gui.component.scss']
})
export class GeneratorGuiComponent implements OnInit {

  constructor(
   
    public signalsService :SignalsService) { }

  ngOnInit(): void {

  }



}
