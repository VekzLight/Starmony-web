import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  userConcreteIntervals: ConcreteInterval[] = [];
  concreteIntervalsSelected: number[] = [];

  userConcreteChords: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];

  userConcreteScales: ConcreteScale[] = [];
  concreteScalesSelected: number[] = [];

  concreteProgressions: ConcreteProgression[] = [];
  concreteProgressionsSelected: number[] = [];


  constructor(private userService:UserService) { }



  ngOnInit(): void {
    this.userService.getAllConcreteIntervals().subscribe((resp: any)=>{
      this.userConcreteIntervals = resp;
      for(let it of this.userConcreteIntervals){
        this.concreteIntervalsSelected.push(it.id_concrete_interval);
      }
    });

    this.userService.getAllConcreteChords().subscribe((resp: any)=>{
      this.userConcreteChords= resp;
      for(let it of this.userConcreteChords){
        this.concreteChordsSelected.push(it.id_concrete_chord);
      }
    });

    this.userService.getAllConcreteScales().subscribe((resp: any)=>{
      this.userConcreteScales = resp;
      for(let it of this.userConcreteScales){
        this.concreteScalesSelected.push(it.id_concrete_scale);
      }
    });

    this.userService.getAllConcreteProgressions().subscribe((resp:any)=>{
      this.concreteProgressions = resp;
      for(let concreteProgression of resp){
        this.concreteProgressionsSelected.push(concreteProgression.id_concrete_progression);
      }
    });
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

  public isSelectedConcreteInterval(id: number):boolean{
    return this.concreteIntervalsSelected.includes(id);
  }

  public isSelectedConcreteChord(id: number):boolean{
    return this.concreteChordsSelected.includes(id);
  }

  public isSelectedConcreteScale(id: number):boolean{
    return this.concreteScalesSelected.includes(id);
  }





  public printConcreteIntervals(concreteInterval: ConcreteInterval):string{
    return concreteInterval.name + ": " + "("+concreteInterval.firsNote.symbol+"-"+concreteInterval.lastNote.symbol+")"  + " " +concreteInterval.semitones;
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
  
  public printConcreteProgression(concreteProgression: ConcreteProgression):string{
    let chords = "";
    for(var index in concreteProgression.concreteGrades){
        let symbol = concreteProgression.concreteGrades[index].symbol;
        if(symbol == "-") symbol = "";
        chords += concreteProgression.concreteGrades[index].tonic.symbol +  symbol + " - ";
    }
    return concreteProgression.symbol + ": " + chords.slice(0, chords.length - 2);
  }
}
