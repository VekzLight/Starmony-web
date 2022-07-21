import { Component, OnInit } from '@angular/core';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Tag } from 'src/app/interfaces/tag.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { RecognizerService } from 'src/app/services/recognizer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {


  concreteScales: ConcreteScale[] = [];
  concreteScalesSelected: number[] = [];


  isAnalize: boolean = false;
  toAnalizeProgression: ConcreteProgression[] = [];


  userConcreteChords: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];

  userConcreteScales: ConcreteScale[] = [];
  concreteScaleSelected: number = 0;


  gradesOfScale: ConcreteChord[] = [];
  intActual: number = 0;

  concreteOriginScale: ConcreteScale[] = [];
  idOriginScale: number = 0;



  genres: Tag[] = [];
  genreSelected: number = 1;

  concreteProgressions: ConcreteProgression[] = [];
  concreteProgressionsSelected: number[] = [];

  responses: ConcreteChord[] = [];

  constructor(
    private userService: UserService,
    private analyzerService: AnalyzerService,
    private generatorService: GeneratorService,
    private recognizerService: RecognizerService) { }


  ngOnInit(): void {
    this.userService.getAllConcreteScales().subscribe((resp: any)=>{
      this.userConcreteScales = resp;
    });
    
    this.recognizerService.getAllTags().subscribe((resp:any)=>{
      this.genres = resp;
    });
    
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

    this.userService.getAllConcreteScales().subscribe((resp:any)=>{
      for(let it of resp){
        this.concreteScalesSelected.push( it.id_concrete_scale );
      }
    });
  }

  public isSelectedConcreteScale(id: number): boolean{
    return this.concreteScalesSelected.includes(id);
  }


  public analizeProgression(concreteProgression: ConcreteProgression):void{
    this.analyzerService.getConcreteScaleFromConcreteProgression(concreteProgression).subscribe((resp: any)=>{
      this.isAnalize = true;
      this.toAnalizeProgression = [];
      this.toAnalizeProgression.push(concreteProgression);

      this.concreteOriginScale = [];
      this.concreteOriginScale.push(resp);

      this.idOriginScale = resp.id_concrete_scale;
    
      console.log(this.concreteOriginScale[0]);
      
      this.gradesOfScale = [];
      this.analyzerService.getConcreteGradesOfConcretescale(resp).subscribe((resp2: ConcreteGradeScales)=>{
        for(var index in resp2.concreteGrades){
          this.gradesOfScale.push(resp2.concreteGrades[index]);
        }
      });
    });
  }

  public unanalizeProgression():void{
    this.isAnalize = false;
  }
  public generateProgressions():void{
    console.log( this.concreteScaleSelected, this.genreSelected );
    this.generatorService.getConcreteProgressionsWithCScaleAndTag(this.concreteScaleSelected, this.genreSelected).subscribe((resp:any)=>{
      console.log(resp);
      this.concreteProgressions = resp;
    });
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

  
  public isSelectedConcreteProgression(id: number): boolean{
    return this.concreteProgressionsSelected.includes(id);
  }

  public selectGenre(idGenre: number):void{
    this.genreSelected = idGenre;
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
}
