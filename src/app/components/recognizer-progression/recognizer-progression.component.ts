import { Component, OnInit } from '@angular/core';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteProgressionME } from 'src/app/interfaces/concreteProgressionME.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { ConcreteScaleME } from 'src/app/interfaces/concreteScaleME.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { Progression } from 'src/app/interfaces/progression.interface';
import { Scale } from 'src/app/interfaces/scale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { RecognizerService } from 'src/app/services/recognizer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recognizer-progression',
  templateUrl: './recognizer-progression.component.html',
  styleUrls: ['./recognizer-progression.component.scss']
})
export class RecognizerProgressionComponent implements OnInit {

  
  isAnalize: boolean = false;

  tonic: number = 1;
  notes: Note[] = [];
  notesSelected: number[] = [1];

  scales: Scale[] = []
  scalesSelected: number[] = [];
  scalesCheck: boolean = false;

  chords: Chord[] = [];
  chordsSelected: number[] = [];
  chordsCheck: boolean = false;

  progressions: Progression[] = [];
  progressionsSelected: number[] = [];
  progressionsCheck: boolean = false;

  concreteProgressions: ConcreteProgression[] = [];
  concreteProgressionsSelected: number[] = [];

  concreteScales: ConcreteScale[] = [];
  concreteScalesSelected: number[] = [];

  concreteIntervalsOfScale: ConcreteInterval[] = [];
  concreteIntervalsSelected: number[] = [];

  gradesOfScale: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];
  intActual: number = 0;

  concreteOriginScale: ConcreteScale[] = [];
  idOriginScale: number = 0;

  toAnalizeProgression: ConcreteProgression[] = [];

  constructor(
    public recognizerService: RecognizerService,
    public analizerService: AnalyzerService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.recognizerService.getAllNotes().subscribe((resp: any)=>{
      this.notes = resp;
    });

    this.recognizerService.getAllChords().subscribe((resp: any)=>{
      this.chords = resp;
    });

    this.recognizerService.getAllScales().subscribe((resp: any)=>{
      this.scales = resp;
    });

    this.recognizerService.getAllProgressions().subscribe((resp: any)=>{
      this.progressions = resp;
    });

  }

  public getConcreteProgressionsWithMe():void{
    let concreteProgressionME: ConcreteProgressionME = {
      idTonic : this.tonic,
      idNotes : this.notesSelected,
      idProgressions  : this.progressionsSelected,
      idScales : this.scalesSelected,
      idChords : this.chordsSelected,
    }
    console.log(concreteProgressionME);

    this.userService.getAllConcreteProgressions().subscribe((resp:any)=>{
      this.concreteProgressionsSelected = [];
      for(let concreteProgression of resp){
        this.concreteProgressionsSelected.push(concreteProgression.id_concrete_progression);
      }
    });

    this.userService.getAllConcreteChords().subscribe((resp:any)=>{
      for(let it of resp){
        this.concreteChordsSelected.push(it.id_concrete_chord);
      }
    });

    this.analizerService.getConcreteProgressionsOfME(concreteProgressionME).subscribe((resp: any)=>{
      this.concreteProgressions = resp;
    });

    this.userService.getAllConcreteScales().subscribe((resp:any)=>{
      for(let it of resp){
        this.concreteScalesSelected.push( it.id_concrete_scale );
      }
    });
  }

  public clearChords():void{
    if( this.chordsCheck == false ){
      this.chordsSelected = [];
    }
  }

  public clearScales():void{
    if( this.scalesCheck == false ){
      this.scalesSelected = [];
    }
  }
  
  public clearProgressions():void{
    if( this.progressionsCheck == false ){
      this.progressionsSelected = [];
    }
  }

  public selectTonic(id: number):void{
    if(this.tonic == id){
      this.tonic = 0;
    } else {
      this.tonic = id;
      if( !this.notesSelected.includes(id) ){
        this.notesSelected.push(id);
      }
    }
  }

  public selectNote(id: number):void{
    if(!this.isSelectedNote(id)){
      this.notesSelected.push(id);
    } else {
      this.removeNote(id);
    }
  }
  
  private removeNote(id: number):void{
    this.notesSelected.forEach((element,index)=>{
      if(element==id)this.notesSelected.splice(index,1); 
    });
  }

  public isSelectedNote(id: number):boolean{
    return this.notesSelected.includes(id);
  }


  public selectChord(id:number):void{
    if(!this.isSelectedChord(id)){
      this.chordsSelected.push(id);
    } else {
      this.removeChord(id);
    }
  }

  private removeChord(id:number):void{
    this.chordsSelected.forEach((element,index)=>{
      if(element==id) this.chordsSelected.splice(index,1);
    });
  }

  public isSelectedChord(id: number):boolean{
    return this.chordsSelected.includes(id);
  }



  public selectProgression(id:number):void{
    if(!this.isSelectedProgression(id)){
      this.progressionsSelected.push(id);
    } else {
      this.removeProgression(id);
    }
  }

  private removeProgression(id:number):void{
    this.progressionsSelected.forEach((element,index)=>{
      if(element==id) this.progressionsSelected.splice(index,1);
    });
  }

  public isSelectedProgression(id: number):boolean{
    return this.progressionsSelected.includes(id);
  }



  public selectScale(id: number):void{
    if(!this.isSelectedScale(id)){
      this.scalesSelected.push(id);
    } else {
      this.removeScale(id);
    }
  }
  
  private removeScale(id: number):void{
    this.scalesSelected.forEach((element,index)=>{
      if(element==id)this.scalesSelected.splice(index,1); 
    });
  }

  public isSelectedScale(id: number):boolean{
    return this.scalesSelected.includes(id);
  }

  public isSelectedConcreteScale(id: number): boolean{
    return this.concreteScalesSelected.includes(id);
  }

  public isSelectedConcreteProgression(id: number): boolean{
    return this.concreteProgressionsSelected.includes(id);
  }

  public guardarProgressionConcreta(id: number):void{
    this.userService.addProgression(id).subscribe((resp:any)=>{
      this.concreteProgressionsSelected.push( Number(resp.message) );
    });
  }

  public eliminarProgressionConcreta(id: number):void{
    this.userService.removeProgression(id).subscribe((resp:any)=>{
      this.concreteProgressionsSelected.forEach((element,index)=>{
        if(element==id) this.concreteProgressionsSelected.splice(index,1);
      });
    });
  }
  

  public printConcreteScale(concreteScale: ConcreteScale):string{
    let notes = "";
    for(var index in concreteScale.notes){
      notes += concreteScale.notes[index].symbol + " - ";
    }
    return concreteScale.tonic.symbol + " " + concreteScale.name + ": " + notes.slice(0, notes.length - 2);
  }

  public printConcreteProgression(concreteProgression: ConcreteProgression):string{
    let chords = "";
    for(var index in concreteProgression.concreteGrades){
        let symbol = concreteProgression.concreteGrades[index].symbol;
        if(symbol == "-") symbol = "";
        chords += concreteProgression.concreteGrades[index].tonic.symbol +  symbol + " - ";
    }
    return concreteProgression.symbol + ": " + chords.slice(0, chords.length - 2);
  }

  public analizeProgression(concreteProgression: ConcreteProgression):void{
    this.analizerService.getConcreteScaleFromConcreteProgression(concreteProgression).subscribe((resp: any)=>{
      this.isAnalize = true;
      this.toAnalizeProgression = [];
      this.toAnalizeProgression.push(concreteProgression);

      this.concreteOriginScale = [];
      this.concreteOriginScale.push(resp);

      this.idOriginScale = resp.id_concrete_scale;
    

      console.log(this.concreteOriginScale[0]);
      this.analizerService.getConcreteGradesOfConcretescale(resp).subscribe((resp2: ConcreteGradeScales)=>{
        for(var index in resp2.concreteGrades){
          this.gradesOfScale.push(resp2.concreteGrades[index]);
        }
      });
    });
  }

  public unanalizeProgression():void{
    this.isAnalize = false;
  }

  public guardarAcordeConcreto(id: number):void{
    this.userService.addChord(id).subscribe((resp:any)=>{
      this.concreteChordsSelected.push( Number(resp.message) );
    });
  }


  public eliminarAcordeConcreto(id:number):void{
    this.userService.removeChord(id).subscribe((resp:any)=>{
      this.concreteChordsSelected.forEach((element,index)=>{
        if(element==id) this.concreteChordsSelected.splice(index,1);
      });
    });
  }

  public isSelectedConcreteChord(id: number):boolean{
    return this.concreteChordsSelected.includes(id);
  }

  public printConcreteGrade(concreteChord: ConcreteChord):string{
    if(this.intActual == 7){
      this.intActual = 0;
    }
    this.intActual += 1;
    let notes = "";
    for(let note of concreteChord.notes){
      notes += note.symbol + " - ";
    }
    return "(Grado " + this.posToGrade(this.intActual) + ") \t" + concreteChord.tonic.symbol + " " + concreteChord.name + ": " + notes.slice(0, notes.length - 2);
  }


  public guardarIntervaloConcreto(id:number):void{
    this.userService.addInterval(id).subscribe((resp:any)=>{
      this.concreteIntervalsSelected.push( Number(resp.message) );
    });
  }


  public eliminarIntervaloConcreto(id:number):void{
    this.userService.removeInterval(id).subscribe((resp:any)=>{
      this.concreteIntervalsSelected.forEach((element,index)=>{
        if(element==id) this.concreteIntervalsSelected.splice(index,1);
      });
    });
  }

  public isSelectedConcreteInterval(id: number):boolean{
    return this.concreteIntervalsSelected.includes(id);
  }

  public printConcreteIntervals(concreteInterval: ConcreteInterval):string{
    return concreteInterval.name + ": " + "("+concreteInterval.firsNote.symbol+"-"+concreteInterval.lastNote.symbol+")"  + " " +concreteInterval.semitones;
  }


  public guardarEscalaConcreta(id: number):void{
    this.userService.addScale(id).subscribe((resp:any)=>{
      this.concreteScalesSelected.push( Number(resp.message) );
    });
  }

  public eliminarEscalaConcreta(id: number):void{
    this.userService.removeScale(id).subscribe((resp:any)=>{
      this.concreteScalesSelected.forEach((element,index)=>{
        if(element==id) this.concreteScalesSelected.splice(index,1);
      });
    });
  }

  
  public posToGrade(grade: number):string{
    switch(grade){
      case 1: return "I";
      case 2: return "II";
      case 3: return "III";
      case 4: return "IV";
      case 5: return "V";
      case 6: return "VI";
      case 7: return "VII";
      default: return "0";
    }
  }

  /**
     
  userConcreteScales: ConcreteScale[] = [];
  concreteScaleSelected: number = 0;

  userConcreteChords: ConcreteChord[] = [];
  concreteChordSelected: number = 0;

  concreteProgressions: ConcreteProgression

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
        for(var index in resp.concreteGrades){
          this.userConcreteChords.push(resp.concreteGrades[index]);
        }
      });
    } else {
      this.concreteScaleSelected = 0;
      this.userConcreteChords = [];
    }

  }

  public selectConcreteChord(concreteChord:ConcreteChord):void{
      console.log("workds")
  }
  */
}
