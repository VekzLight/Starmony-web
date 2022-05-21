import { Component, OnInit } from '@angular/core';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {


  userConcreteChords: ConcreteChord[] = [];
  concreteChordSelected: number = 0;

  userConcreteScales: ConcreteScale[] = [];
  concreteScaleSelected: number = 0;

  responses: ConcreteChord[] = [];

  constructor(
    private userService: UserService,
    private analyzerService: AnalyzerService,
    private generatorService: GeneratorService) { }


  ngOnInit(): void {
    this.userService.getAllConcreteScales().subscribe((resp: any)=>{
      this.userConcreteScales = resp;
    });
    
  }

  public printConcreteChord(concreteChord: ConcreteChord):string{
    let notes = "";
    for(let note of concreteChord.notes){
      notes += note.symbol + " - ";
    }
    return concreteChord.tonic.symbol + " " + concreteChord.name + ": " + notes.slice(0, notes.length - 2);
  }

  public printConcreteScale(concreteScale: ConcreteScale):string{
    let notes = "";
    for(var index in concreteScale.notes){
      notes += concreteScale.notes[index].symbol + " - ";
    }
    return concreteScale.tonic.symbol + " " + concreteScale.name + ": " + notes.slice(0, notes.length - 2);
  }

  public selectConcreteScale(concreteScale: ConcreteScale):void{
    if(this.concreteScaleSelected != concreteScale.id_concrete_scale){
      this.concreteScaleSelected = concreteScale.id_concrete_scale;

      this.analyzerService.getConcreteGradesOfConcretescale(concreteScale).subscribe((resp: ConcreteGradeScales)=>{
        this.userConcreteChords = [];
        this.responses = [];
        for(var index in resp.concreteGrades){
          this.userConcreteChords.push(resp.concreteGrades[index]);
        }
      });
    } else {
      this.concreteScaleSelected = 0;
      this.userConcreteChords = [];
      this.responses = [];
    }

  }

  public selectConcreteChord(concreteChord:ConcreteChord):void{
    let ids: number[] = [concreteChord.id_concrete_chord, this.concreteScaleSelected, this.responses.length + 1];
    this.generatorService.predictConcreteChord(ids).subscribe((resp: ConcreteChord)=>{
      this.responses.push(resp);
    });
  }
}
