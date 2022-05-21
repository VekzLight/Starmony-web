import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteIntervalME } from 'src/app/interfaces/concreteIntervalME.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { RecognizerService } from 'src/app/services/recognizer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recognizer-interval',
  templateUrl: './recognizer-interval.component.html',
  styleUrls: ['./recognizer-interval.component.scss']
})
export class RecognizerIntervalComponent implements OnInit {

  isAnalize: boolean = false;
  toAnalize: ConcreteInterval[] = [];

  tonic: number = 1;

  notes: Note[] = [];
  notesSelected: number[] = [1];
  concreteIntervals: ConcreteInterval[] = [];

  userConcreteIntervals: ConcreteInterval[] = [];
  concreteIntervalsSelected: number[] = [];

  concreteChords: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];


  concreteScales: ConcreteScale[] = [];
  concreteScalesSelected: number[] = [];


  intervals: Interval[] = [];
  intervalsSelected: number[] =[];
  intervalsCheck: boolean = false;

  constructor(
    public recognizerService: RecognizerService,
    public analizerService: AnalyzerService,
    public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.recognizerService.getAllNotes().subscribe((resp: any)=>{
      this.notes = resp;
    });

    this.recognizerService.getAllIntervals().subscribe((resp: any)=>{
      this.intervals = resp;
    });

    this.userService.getAllConcreteIntervals().subscribe((resp: any)=>{
      this.userConcreteIntervals = resp;
      
      this.concreteIntervalsSelected = [];
      for(let it of this.userConcreteIntervals){
        this.concreteIntervalsSelected.push(it.id_concrete_interval);
      }
    });
  }


  public getConcreteIntervalsWithME():void{
    let concreteIntervalMe: ConcreteIntervalME = {
      tonic     : this.tonic,
      intervals : this.intervalsSelected,
      notes     : this.notesSelected,
    }
    this.analizerService.getConcreteIntervalsWithME(concreteIntervalMe).subscribe((resp: any)=>{
      this.concreteIntervals = resp;
    });
  }

  public selectFirstNote(id: number):void{
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

  public clearInterval():void{
    if( this.intervalsCheck == false ){
      this.intervalsSelected = [];
    }
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

  public analizeInterval(concreteInterval: ConcreteInterval):void{
    this.isAnalize = true;
    this.toAnalize = [];
    this.toAnalize.push(concreteInterval);

    this.userService.getAllConcreteChords().subscribe((resp: ConcreteChord[])=>{
      this.concreteChordsSelected = [];
      for(let it of resp){
        this.concreteChordsSelected.push(it.id_concrete_chord);
      }
    });

    this.analizerService.getAllConcreteChordsWithConcreteIntervals(concreteInterval).subscribe((resp: ConcreteChord[])=>{
      this.concreteChords = resp;
    });

    this.userService.getAllConcreteScales().subscribe((resp: ConcreteScale[])=>{
      this.concreteScalesSelected = [];
      for(let it of resp){
        this.concreteScalesSelected.push(it.id_concrete_scale);
      }
    });

    this.analizerService.getAllConcreteScalesWithConcreteIntervals(concreteInterval).subscribe((resp: ConcreteScale[])=>{
      this.concreteScales = resp;
    });
  }
  
  public unanalizeInterval():void{
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

  public printConcreteChord(concreteChord: ConcreteChord):string{

    let notes = "";
    for(let note of concreteChord.notes){
      notes += note.symbol + " - ";
    }
    return concreteChord.tonic.symbol + " " + concreteChord.name + ": " + notes.slice(0, notes.length - 2);
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
}
