import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { ConcreteScaleME } from 'src/app/interfaces/concreteScaleME.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { Scale } from 'src/app/interfaces/scale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { RecognizerService } from 'src/app/services/recognizer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recognizer-scale',
  templateUrl: './recognizer-scale.component.html',
  styleUrls: ['./recognizer-scale.component.scss']
})
export class RecognizerScaleComponent implements OnInit {

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

  concreteScales: ConcreteScale[] = [];
  concreteScalesSelected: number[] = [];

  concreteIntervalsOfScale: ConcreteInterval[] = [];
  concreteIntervalsSelected: number[] = [];

  gradesOfScale: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];

  toAnalizeScale: ConcreteScale = {
    id: 0,
    name: "",
    code: "",
    tonic: {id: 0, name: "", symbol: ""},
    notes: [{id: 0, name: "", symbol: ""}],
    symbol: "",
    id_concrete_scale: 0,
  };

  constructor(
    public recognizerService: RecognizerService,
    public analizerService: AnalyzerService,
    public userService: UserService,
    private router: Router) { }

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

    this.userService.getAllConcreteScales().subscribe((resp: any)=>{
      for(let it of resp){
        this.concreteScalesSelected.push(it.id_concrete_scale);
      }
    });

  }

  public getConcreteScaleWithMe():void{
    let concreteScaleMe: ConcreteScaleME = {
      tonic  : this.tonic,
      scales : this.scalesSelected,
      chords : this.chordsSelected,
      notes  : this.notesSelected,
    }
    console.log(concreteScaleMe);

    this.analizerService.getConcreteScalesWithME(concreteScaleMe).subscribe((resp: any)=>{
      this.concreteScales = resp;
      console.log(resp);
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
  

  public printConcreteScale(concreteScale: ConcreteScale):string{
    let notes = "";
    for(var index in concreteScale.notes){
      notes += concreteScale.notes[index].symbol + " - ";
    }
    return concreteScale.tonic.symbol + " " + concreteScale.name + ": " + notes.slice(0, notes.length - 2);
  }

  public analizeScale(concreteScale: ConcreteScale):void{
    this.isAnalize = true;
    this.toAnalizeScale = concreteScale;
    this.userService.getAllConcreteChords().subscribe((resp: ConcreteChord[])=>{
      this.chordsSelected = [];
      for(let it of resp){
        this.concreteChordsSelected.push(it.id_concrete_chord);
      }
    });

    this.analizerService.getConcreteGradesOfConcretescale(concreteScale).subscribe((resp: ConcreteGradeScales)=>{
      this.gradesOfScale = [];
      for(var index in resp.concreteGrades){
        this.gradesOfScale.push(resp.concreteGrades[index]);
      }
      console.log(this.gradesOfScale);
    });


    this.userService.getAllConcreteIntervals().subscribe((resp: ConcreteInterval[])=>{
      this.concreteIntervalsSelected = [];
      for(let it of resp){
        this.concreteIntervalsSelected.push(it.id_concrete_interval);
      }
    });

    this.analizerService.getIntervalsOfScale(concreteScale).subscribe((resp: ConcreteInterval[])=>{
      this.concreteIntervalsOfScale = resp;
    });
  }

  public unanalizeScale():void{
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

  public printConcreteGrade(concreteChord: ConcreteChord, index: number):string{

    let notes = "";
    for(let note of concreteChord.notes){
      notes += note.symbol + " - ";
    }
    return "(Grado " + this.posToGrade(index) + ") \t" + concreteChord.tonic.symbol + " " + concreteChord.name + ": " + notes.slice(0, notes.length - 2);
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
}
