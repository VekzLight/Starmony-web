import { Component, OnInit } from '@angular/core';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { Scale } from 'src/app/interfaces/scale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { CreatorService } from 'src/app/services/creator.service';
import { RecognizerService } from 'src/app/services/recognizer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-creator-scale',
  templateUrl: './creator-scale.component.html',
  styleUrls: ['./creator-scale.component.scss']
})
export class CreatorScaleComponent implements OnInit {

  isCreated: boolean = false;
  validCode: boolean = true;
  message: string = "";

  tonic: number = 1;
  notes: Note[] = [];
  notesSelected: number[] = [1];

  grades: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];

  do: Note ={
    id: 1,
    name: "do",
    symbol: "C",
  };

  scale: Scale = {
    id:     0,
    name:   "",
    symbol: "",
    code:   ""
  };

  createdScale: Scale = this.scale;
  concreteScale: ConcreteScale = {
    id:     0,
    name:   "",
    symbol: "",
    code:   "",
    tonic:  this.do,
    notes:  this.notes,
    id_concrete_scale: 0
  };
  concreteScalesSelected: number[] = [];

  constructor(
    private recognizerService: RecognizerService,
    private creatorService: CreatorService,
    private analyzerService: AnalyzerService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.recognizerService.getAllNotes().subscribe((resp: any)=>{
      this.notes = resp;
    });

    this.userService.getAllConcreteScales().subscribe((resp: any)=>{
      for(let it of resp){
        this.concreteScalesSelected.push(it.id_concrete_scale);
      }
    });

    this.userService.getAllConcreteChords().subscribe((resp: ConcreteChord[])=>{
      this.concreteChordsSelected = [];
      for(let it of resp){
        this.concreteChordsSelected.push(it.id_concrete_chord);
      }
    });
  }

  public addSemitone(semitone: number):void{
    if(this.scale.code == "") this.scale.code += semitone;
    else this.scale.code += "-"+semitone;
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

  public crearEscala():void{
    let countSemitones = 0;
    for(let it of this.scale.code.split("-",) ){
      countSemitones += Number(it); 
    }

    if(countSemitones != 12){
      this.validCode = false;
      console.log("Codigo no valido");
      return;
    }

    this.isCreated = false;
    this.grades = [];
    this.notesSelected = [];

    console.log("procesando");
    if(this.scale.name != "" && this.scale.code != ""){
      this.creatorService.createScale(this.scale).subscribe((resp:any)=>{
        console.log(resp);
        switch(resp.type){
          case  2: 
            this.existScale( Number(resp.message) );
            this.isCreated = true;
            break;
          case  1: 
            this.createScale( Number(resp.message) );
            this.isCreated = true;
            break;
          case -1: 
            this.errorScale(resp.message);
            this.validCode = false;
            break;
        }
      });
    }
    console.log("listo");
  }


  public existScale(id: number):void{
    this.recognizerService.getScaleById(id).subscribe((resp:any)=>{
      this.createdScale = resp;
      this.scale = {
        id:     0,
        name:   "",
        symbol: "",
        code:   ""
      };

      console.log(resp);

      this.recognizerService.getConcreteScaleByIdAndTonic(this.createdScale, this.do).subscribe((resp2:any)=>{
        this.concreteScale = resp2;
        for(var index in this.concreteScale.notes){
          this.notesSelected.push(this.concreteScale.notes[index].id);
        }
        console.log(resp2);

        this.analyzerService.getConcreteGradesOfConcretescale(this.concreteScale).subscribe((resp3:ConcreteGradeScales)=>{
          for(var index in resp3.concreteGrades){
            this.grades.push(resp3.concreteGrades[index]);
          }
          console.log(resp3);
        });
      });
    });
  }


  public createScale(id:number):void{
    this.recognizerService.getScaleById(id).subscribe((resp:any)=>{
      this.createdScale = resp;
      console.log(resp);

      this.recognizerService.getConcreteScaleByIdAndTonic(this.createdScale, this.do).subscribe((resp2:any)=>{
        this.concreteScale = resp2;
        for(var index in this.concreteScale.notes){
          this.notesSelected.push(this.concreteScale.notes[index].id);
        }
        console.log(resp2);

        this.analyzerService.getConcreteGradesOfConcretescale(this.concreteScale).subscribe((resp3:ConcreteGradeScales)=>{
          for(var index in resp3.concreteGrades){
            this.grades.push(resp3.concreteGrades[index]);
          }
          console.log(resp3);
        });
      });
    });
  }

  public errorScale(message: string):void{

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
