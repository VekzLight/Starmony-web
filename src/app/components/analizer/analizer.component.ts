import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ChordAnalized } from 'src/app/interfaces/chordAnalized.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-analizer',
  templateUrl: './analizer.component.html',
  styleUrls: ['./analizer.component.scss']
})
export class AnalizerComponent implements OnInit {

  constructor(
    public signalsService:SignalsService
  ) {
    
  }

  ngOnInit(): void {
  }

}
