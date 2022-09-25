import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-intervals-selector',
  templateUrl: './intervals-selector.component.html',
  styleUrls: ['./intervals-selector.component.scss']
})
export class IntervalsSelectorComponent implements OnInit {

  intervalsSimples: ConcreteInterval[] = [];
  code: string;
  codeSymbol: string;

  constructor(
    public elementsContainerService:ElementsContainerService,
    public generatorService:GeneratorService,
    public signalsService :SignalsService,
    private router: Router
    ) {
      this.elementsContainerService.intervalsSelectedGen = [];
      this.elementsContainerService.notesSelected = [];
  }

  ngOnInit(): void {
    
    this.elementsContainerService.intervalsSelectedGen = [];
    this.elementsContainerService.notesSelected = [];
    
    this.intervalsSimples = this.elementsContainerService.concreteIntervals.filter( concreteInterval => (concreteInterval.semitones <=  11) && (concreteInterval.firstNote.id == 1));
  }

  private generateCode():void{
    this.elementsContainerService.intervalsSelectedGen = this.elementsContainerService.intervalsSelectedGen.sort( (interval1, interval2) => {return interval1.id - interval2.id} );

    this.code = "";
    this.codeSymbol = "";
    let ant: ConcreteInterval = { semitones: 0 } as ConcreteInterval;
    for( let interval of this.elementsContainerService.intervalsSelectedGen ){
      let semitones = (interval.semitones - ant.semitones);
      this.code += semitones + "-";

      if( (semitones%2) == 0 ) this.codeSymbol += ((semitones/2 == 1) ? "" : semitones/2) + "T" + "-";
      else this.codeSymbol += (semitones == 1 ? "" : semitones) + "sT" +"-"
      
      ant = interval;
    }
    this.code += 12 - ant.semitones;
    if( ((12-ant.semitones)%2) == 0 ) this.codeSymbol += (((12-ant.semitones)/2 == 1) ? "" : (12-ant.semitones)/2) + "T"
    else this.codeSymbol += ((12-ant.semitones) == 1 ? "" : (12-ant.semitones)) + "sT"
  }

  public selectInterval(interval: ConcreteInterval):void{
    if( this.elementsContainerService.intervalsSelectedGen.find(_interval => _interval.id == interval.id) !== undefined ){
      this.elementsContainerService.intervalsSelectedGen = this.elementsContainerService.intervalsSelectedGen.filter( _interval => _interval.id != interval.id);
      this.elementsContainerService.notesSelected = this.elementsContainerService.notesSelected.filter( note => note.id != interval.lastNote.id );
    }
    else{
      this.elementsContainerService.intervalsSelectedGen.push(interval);
      this.elementsContainerService.selectNote(interval.lastNote)
    } 
    this.generateCode();
  }

  public compareIdNote(note: Note):boolean{
    return this.elementsContainerService.notesSelected.some( it => it.id == note.id );
  }

  public generarEscala():void{
    this.generatorService.generateCompleteScale(this.code).subscribe( resp =>{
      localStorage.setItem("scaleGenerated", JSON.stringify(resp));
      localStorage.setItem("generated", JSON.stringify(true));


      this.elementsContainerService.scaleGenerated = resp;
      this.signalsService.generated = true;

      this.router.navigate(['/home/generator_scale']);
    });
  }
}
