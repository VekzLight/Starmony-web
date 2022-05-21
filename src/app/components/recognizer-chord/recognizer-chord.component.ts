import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/interfaces/note.interface';
import { ConcreteChordME } from 'src/app/interfaces/concreteChordME.interface';
import { RecognizerService } from 'src/app/services/recognizer.service';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Chord } from 'src/app/interfaces/chord.interface';
import { UserService } from 'src/app/services/user.service';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';


@Component({
  selector: 'app-recognizer-chord',
  templateUrl: './recognizer-chord.component.html',
  styleUrls: ['./recognizer-chord.component.scss']
})
export class RecognizerChordComponent implements OnInit {


  isAnalize: boolean = false;
  toAnalizeChord: ConcreteChord[] = [];

  tonic: number = 1;
  notes: Note[] = [];
  notesSelected: number[] = [1];

  intervals: Interval[] = [];
  intervalsSelected: number[] =[];
  intervalsCheck: boolean = false;

  chords: Chord[] = [];
  chordsSelected: number[] = [];
  chordsCheck: boolean = false;

  concreteChords: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];

  concreteScales: ConcreteScale[] = [];
  concreteScalesSelected: number[] = [];

  concreteIntervals: ConcreteInterval[] = [];
  userConcreteIntervals: ConcreteInterval[] = [];
  concreteIntervalsSelected: number[] = [];

  concreteIntervalsOfChord: ConcreteInterval[] = [];

  constructor(
    public recognizerService: RecognizerService,
    public analizerService: AnalyzerService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.recognizerService.getAllNotes().subscribe((resp: any)=>{
      this.notes = resp;
    });

    this.recognizerService.getAllIntervals().subscribe((resp: any)=>{
      this.intervals = resp;
    });

    this.recognizerService.getAllChords().subscribe((resp: any)=>{
      this.chords = resp;
    });

    this.userService.getAllConcreteChords().subscribe((resp: any)=>{
      for(let it of resp){
        this.concreteChordsSelected.push(it.id_concrete_chord);
      }
    });

  }

  public analizeChord(concreteChord: ConcreteChord):void{
    this.isAnalize = true;
    this.toAnalizeChord = [];
    this.toAnalizeChord.push(concreteChord);

    this.userService.getAllConcreteIntervals().subscribe((resp: ConcreteInterval[])=>{
      this.concreteIntervalsSelected = [];
      for(let it of resp){
        this.concreteIntervalsSelected.push(it.id_concrete_interval);
      }
    });

    this.analizerService.getConcreteIntervalsOfConcreteChord(concreteChord).subscribe((resp: ConcreteInterval[])=>{
      this.concreteIntervalsOfChord = resp;
    });


    this.userService.getAllConcreteScales().subscribe((resp: ConcreteScale[])=>{
      this.concreteScalesSelected = [];
      for(let it of resp){
        this.concreteScalesSelected.push(it.id_concrete_scale);
      }
    });


    this.analizerService.getConcreteScalesWithConcreteChord(concreteChord).subscribe((resp: ConcreteScale[])=>{
      this.concreteScales = resp;
    });

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

  public isSelectedConcreteScale(id: number): boolean{
    return this.concreteScalesSelected.includes(id);
  }

  public getChordsSelected(e: number[]){
    this.chordsSelected = e;
  }

  public getIntervalsSelected(e: number[]){
    this.intervalsSelected = e;
  }

   
  public unanalizeChord():void{
    this.isAnalize = false;
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

  
  public getConcreteChordsWithME():void{
    let concreteChordMe: ConcreteChordME = {
      tonic     : this.tonic,
      chord     : this.chordsSelected,
      intervals : this.intervalsSelected,
      notes     : this.notesSelected,
    }
    console.log(concreteChordMe)

    this.analizerService.getConcreteChordsWithME(concreteChordMe).subscribe((resp: any)=>{
      this.concreteChords = resp;
      console.log(resp);
    });
  }

  public clearInterval():void{
    if( this.intervalsCheck == false ){
      this.intervalsSelected = [];
    }
  }

  public clearChords():void{
    if( this.chordsCheck == false ){
      this.chordsSelected = [];
    }
  }

  public getAll():void{
    this.recognizerService.getAllConcreteChords().subscribe((resp: any)=>{
      this.concreteChords = resp;
    });
  }

  public printInfo(it:ConcreteChord):string{
    let notes: string = "{";
    for(let note of it.notes){
      notes += "-";
      notes += note.symbol;
    }
    notes += "}";
    notes = notes.slice(0,1) + notes.slice(2, notes.length);
    return it.notes[0].name + " " + it.name + " " + notes;
  }

  public selectInterval(id:number):void{
    if(!this.isSelectedInterval(id)){
      this.intervalsSelected.push(id);
    } else {
      this.removeInterval(id);
    }
  }

  private removeInterval(id:number):void{
    this.intervalsSelected.forEach((element,index)=>{
      if(element==id) this.intervalsSelected.splice(index,1);
    });
  }

  public isSelectedInterval(id: number):boolean{
    return this.intervalsSelected.includes(id);
  }

  public printInterval(interval:Interval):string{
    return interval.name + ": " + interval.semitones;
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

  public printConcreteChord(concreteChord: ConcreteChord):string{
    let notes = "";
    for(let note of concreteChord.notes){
      notes += note.symbol + " - ";
    }
    return concreteChord.tonic.symbol + " " + concreteChord.name + ": " + notes.slice(0, notes.length - 2);
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
}
