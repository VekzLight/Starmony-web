import { Component, OnInit } from '@angular/core';
import { ScaleGenerated } from 'src/app/interfaces/scaleGenerated.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-generator-gui',
  templateUrl: './generator-gui.component.html',
  styleUrls: ['./generator-gui.component.scss']
})
export class GeneratorGuiComponent implements OnInit {

  constructor(
    public signalsService :SignalsService,
    private elementsContainerService: ElementsContainerService,
    ) { }

  ngOnInit(): void {
    this.elementsContainerService.scaleGenerated = JSON.parse( localStorage.getItem("scaleGenerated") || '{}' );
    this.signalsService.generated = JSON.parse( localStorage.getItem("generated") || '{}' );
  }



}
