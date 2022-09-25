import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-grade-selector',
  templateUrl: './grade-selector.component.html',
  styleUrls: ['./grade-selector.component.scss']
})
export class GradeSelectorComponent implements OnInit {

  intervalsSimples: ConcreteInterval[] = [];
  code: string = "";
  codeSymbol: string;


  grades: string[] = ["I","II","III","IV","V","VI","VII"];
  gradeSelected: string;
  gradesSelected: string[] = [];

  constructor(
    public seekerResultElements: SeekerResultElementsService,
    public elementsContainerService:ElementsContainerService,
    public generatorService:GeneratorService,
    public signalsService :SignalsService,
    private router: Router) { }

  ngOnInit(): void {
  }

  

  public generarProgression():void{
    this.generatorService.generateCompleteProgression(this.code).subscribe( resp =>{
      localStorage.setItem("progressionGenerated", JSON.stringify(resp));
      localStorage.setItem("generated", JSON.stringify(true));


      this.elementsContainerService.progressionGenerated = resp;
      this.signalsService.generated = true;

      this.router.navigate(['/home/generator_progression']);
    });
  }


  public selectChord(grade: string):void{
    this.code += grade;
  }
}
