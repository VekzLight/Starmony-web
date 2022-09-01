import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Tag } from 'src/app/interfaces/tag.interface';
import { CanvasToolsService } from 'src/app/services/canvas-tools.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.scss']
})
export class ElementDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('detailCanvasScale', { static: true }) canvasScale: ElementRef<HTMLCanvasElement>;
  
  @ViewChild('detailCanvasProgression', { static: true }) canvasProgression: ElementRef<HTMLCanvasElement>;
  @ViewChild('detailCanvasProgressionScale', { static: true }) canvasProgressionScale: ElementRef<HTMLCanvasElement>;

  public ctxScale: CanvasRenderingContext2D | null;
  public ctxProgression: CanvasRenderingContext2D | null;
  public ctxProgressionScale: CanvasRenderingContext2D | null;

  constructor(
    public elementsContainerService: ElementsContainerService,
    public signalsService: SignalsService,
    private cts :CanvasToolsService
  ) {
    if( localStorage.getItem("chordAnalized" ) == undefined) localStorage.setItem("chordAnalized", JSON.stringify(
      {   id:                -1,
          name:              "",
          symbol:            "",
          code:              "",
          id_concrete_chord: -1,
          tonic:             { id:-1, name:"", symbol:"" },
          notes:             []
        } as ConcreteChord ));
    if( localStorage.getItem("scaleDetail" ) == undefined)        localStorage.setItem("scaleDetail", JSON.stringify(
      {   id:                -1,
          name:              "",
          symbol:            "",
          code:              "",
          id_concrete_scale: -1,
          tonic:             { id:-1, name:"", symbol:"" },
          notes:             {}
        } as ConcreteScale ));
    if( localStorage.getItem("intervalDetail" ) == undefined)     localStorage.setItem("intervalDetail",    JSON.stringify(
      {   id:                -1,
          name:              "",
          symbol:            "",
          semitones:         -1,
          id_concrete_interval: -1,
          firstNote:          { id:-1, name:"", symbol:"" },
          lastNote:           { id:-1, name:"", symbol:"" }
        } as ConcreteInterval ));
    if( localStorage.getItem("progressionDetail" ) == undefined)  localStorage.setItem("progressionDetail", JSON.stringify(
      {   id:                -1,
          name:              "",
          symbol:            "",
          code:         "",
          scale:         { id: -1, name:"", symbol:"", code:"" },
          id_progression_grade: -1,
          id_concrete_progression: -1,
          id_concrete_scale: -1,
          grades:          { },
          concreteGrades:          { },
        } as ConcreteProgression ));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    
    if(this.signalsService.relatedAnalized == "scale" && this.signalsService.typeElementAnalized == "chord" ){
      if(!this.canvasScale.nativeElement.getContext)
        throw new Error(`2d context not supported or canvas already initialized`);

      this.ctxScale = this.canvasScale.nativeElement.getContext("2d");
      if(this.ctxScale?.canvas !== undefined){
        this.ctxScale.canvas.height = 500;
        this.ctxScale.canvas.width = 800;
      }

      if(this.ctxScale != null){
        this.ctxScale.lineWidth = 1;

          this.cts.drawRectText(this.ctxScale, 285, 10, this.elementsContainerService.scaleDetail.tonic.name + " " +this.elementsContainerService.scaleDetail.symbol);
          this.drawLinesGrades(this.ctxScale, 330, 10 + (this.cts.fontSize*2));
      }
    }


    if(this.signalsService.relatedAnalized == "progression" && this.signalsService.typeElementAnalized == "scale" ){
      if(!this.canvasProgressionScale.nativeElement.getContext)
        throw new Error(`2d context not supported or canvas already initialized`);

      this.ctxProgressionScale = this.canvasProgressionScale.nativeElement.getContext("2d");

      if(this.ctxProgressionScale?.canvas !== undefined){
        this.ctxProgressionScale.canvas.height = 460 + ( Object.values(this.elementsContainerService.progressionDetail.concreteGrades).length * 50 );
        this.ctxProgressionScale.canvas.width = 800 + ( this.elementsContainerService.progressionDetail.symbol.length * 5 );
      }


      if(this.ctxProgressionScale != null){
        this.ctxProgressionScale.lineWidth = 1;
        this.rePaintProgression(this.ctxProgressionScale);
      }
    }


    if(this.signalsService.relatedAnalized == "progression" && this.signalsService.typeElementAnalized == "chord" ){
      if(!this.canvasProgression.nativeElement.getContext)
        throw new Error(`2d context not supported or canvas already initialized`);

      this.ctxProgression = this.canvasProgression.nativeElement.getContext("2d");

      if(this.ctxProgression?.canvas !== undefined){
        this.ctxProgression.canvas.height = 460 + ( Object.values(this.elementsContainerService.progressionDetail.concreteGrades).length * 50 );
        this.ctxProgression.canvas.width = 800 + ( this.elementsContainerService.progressionDetail.symbol.length * 5 );
      }

      if(this.ctxProgression != null){
        this.ctxProgression.lineWidth = 1;

        this.cts.drawRectText(this.ctxProgression, 330, 10, this.elementsContainerService.scaleDetail.tonic.name + " " +this.elementsContainerService.scaleDetail.symbol);
        this.drawLinesProgression(this.ctxProgression, 380, 10 + (this.cts.fontSize*2));
        this.cts.drawRectText(this.ctxProgression, 330, 410 + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50, this.elementsContainerService.progressionDetail.symbol);
      }
    }
  }

  public rePaintProgression (ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

    this.cts.drawRectText(ctx, 330, 10, this.elementsContainerService.scaleDetail.tonic.name + " " +this.elementsContainerService.scaleDetail.symbol);
    this.drawLinesProgressionScale(ctx, 380, 10 + (this.cts.fontSize*2));
    this.cts.drawRectText(ctx, 330, 410 + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50, this.elementsContainerService.progressionDetail.symbol);
  }

  public searchProgression(idProgression: number): string{
    if( idProgression == -1 ) return "";
    var concreteProgression = this.elementsContainerService.concreteProgressions.find( concreteProgression => concreteProgression.id_concrete_progression == idProgression );

    var positions = this.elementsContainerService.chordAnalizedResp.concreteProgressionsIds[idProgression];
    var stringPositions = "";
    var grades = "";

    for(var key in positions){
      let symbol: string = positions.length - 2 == +key ? " y " : ", ";
      stringPositions += this.signalsService.grades[positions[+key] - 1] + symbol;
    }
    

    if( concreteProgression!== undefined )
      for(var key in concreteProgression.concreteGrades){
        grades += concreteProgression.concreteGrades[+key].tonic.symbol + "" +concreteProgression.concreteGrades[+key].symbol + " - ";
      }
    
    stringPositions = stringPositions.slice(0,-2);
    
    return stringPositions + " Posicion";
  }

  
  public getTypeChord(concreteChord: ConcreteChord): string{
    let types: {[key:number]:string} = { 3: "triada", 4:"Septima", 5:"Novena", 6:"Treceava" };
    return types[concreteChord.notes.length];
  }

  public group(idScale: number):string |undefined{
    let  tagScales = this.elementsContainerService.tagScales.find( (tagScale) => tagScale.scaleDTO.id == idScale );
    return tagScales?.tagDTO.name;
  }

  public getTipesChords(concreteScale: ConcreteScale):string{
    let concreteScaleGrade = this.elementsContainerService.concreteScaleGrades.find(sg => sg.idConcreteScaleGrade == concreteScale.id_concrete_scale);

    let typeChords = "";
    let map = new Map();
    
    for(let _key in concreteScaleGrade?.concreteGrades){
      const type = concreteScaleGrade?.concreteGrades[+_key].name;
      const collection = map.get(type);
      
      if (collection === undefined) {
        map.set(type, 1);
      } else {
        map.set(type, collection + 1);
      }
    }

    map.forEach( (value,key) => {
      typeChords += value + " Acordes de tipo " + key + ", ";
    });

    return typeChords.slice(0,-2) + ".";
  }

  public getTagsProgressionsOf(idProgression: number):Tag[]{
    var generos = this.elementsContainerService.tagProgressions.filter( tagProgression => tagProgression.progressionDTO.id == idProgression ).map( tagProgression => tagProgression.tagDTO );
    if(generos.length != 0)
      if(generos[0].id == 100) return [{id:100, name:"Desconocidos", description:"desconocidos", value:-1}];
    return this.elementsContainerService.tagProgressions.filter( tagProgression => tagProgression.progressionDTO.id == idProgression ).map( tagProgression => tagProgression.tagDTO );
  }

  public getTipesChordsList(concreteScale: ConcreteScale): string[]{
    let concreteScaleGrade = this.elementsContainerService.concreteScaleGrades.find(sg => sg.idConcreteScaleGrade == concreteScale.id_concrete_scale);

    let typeChords: string[] = [];
    let map = new Map();
    
    for(let _key in concreteScaleGrade?.concreteGrades){
      const type = concreteScaleGrade?.concreteGrades[+_key].name;
      const collection = map.get(type);
      
      if (collection === undefined) {
        map.set(type, 1);
      } else {
        map.set(type, collection + 1);
      }
    }

    map.forEach( (value,key) => {
      typeChords.push(value + " Acordes de tipo " + key);
    });

    return typeChords;
  }

  public getTipesGradesList(concreteProgression: ConcreteProgression): string[]{

    let typeChords: string[] = [];
    let map = new Map();
    
    for(let _key in concreteProgression?.concreteGrades){
      const type = concreteProgression?.concreteGrades[+_key].name;
      const collection = map.get(type);
      
      if (collection === undefined) {
        map.set(type, 1);
      } else {
        map.set(type, collection + 1);
      }
    }

    map.forEach( (value,key) => {
      typeChords.push(value + " Acordes de tipo " + key);
    });

    return typeChords;
  }

  
  private drawLinesGrades(ctx: CanvasRenderingContext2D, x:number, y:number):void{
    let notes = Object.values(this.elementsContainerService.scaleDetail.notes).slice(0,-1);
    let positions = 800 / 9;

    let indexPosition = positions;
    for(let key in notes){
      let scaleGrade = this.elementsContainerService.concreteScaleGrades.find( sg => sg.idConcreteScaleGrade == this.elementsContainerService.scaleDetail.id_concrete_scale );
      

      ctx.strokeStyle = this.signalsService.colors[ +key + 1 ];


      if(scaleGrade?.concreteGrades[+key + 1].id_concrete_chord == this.elementsContainerService.chordAnalized.id_concrete_chord){
        ctx.fillStyle = ctx.strokeStyle
        ctx.fillRect(indexPosition - 5, y + 55, 75, 230 );
        this.cts.drawRectTextNotesLargeNeon(ctx, indexPosition, y + 300, scaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + scaleGrade?.concreteGrades[+key + 1].symbol+"");      
        ctx.strokeStyle = "#000"
      } else {
        ctx.strokeRect(indexPosition - 5, y + 55, 75, 230 );
        this.cts.drawRectTextNotesLarge(ctx, indexPosition, y + 300, scaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + scaleGrade?.concreteGrades[+key + 1].symbol+"");      
      }

      this.cts.drawRectTextGrades(ctx, indexPosition, y + 60, this.signalsService.gradesI[+key] +"");
      this.cts.drawRectTextNotes(ctx, indexPosition, y + 120, notes[key].symbol+"");


      let notesShift = Object.values(notes);
      for(let i = 0; i < 2; i++){
        let note = notesShift.shift();
        if( note !== undefined ) notesShift.push(note);
      }
      this.cts.drawRectTextNotes(ctx, indexPosition, y + 180, notesShift[+key].symbol+"");

      for(let i = 0; i < 2; i++){
        let note = notesShift.shift();
        if( note !== undefined ) notesShift.push(note);
      }
      this.cts.drawRectTextNotes(ctx, indexPosition, y + 240, notesShift[+key].symbol+"");

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 100);
      ctx.lineTo(20 + indexPosition,  y + 120);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 160);
      ctx.lineTo(20 + indexPosition,  y + 180);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 220);
      ctx.lineTo(20 + indexPosition,  y + 240);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(indexPosition + 30, y + 285);
      ctx.lineTo(indexPosition + 30, y + 300);
      ctx.stroke();
      ctx.closePath();

      indexPosition += positions;
    }
  }

  private drawLinesProgression(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.scaleDetail.notes).slice(0,-1);
    let positions = 800 / 9;

    let indexPosition = positions;

    let positionX: { [key: number]: number } = {};
    let colorX: { [key: number]: number } = {};

    for(let key in notes){

      ctx.strokeStyle = this.signalsService.colors[ +key + 1 ]
      
      let scaleGrade = this.elementsContainerService.concreteScaleGrades.find( sg => sg.idConcreteScaleGrade == this.elementsContainerService.scaleDetail.id_concrete_scale );
      

      if( scaleGrade?.concreteGrades[+key + 1].id_concrete_chord == this.elementsContainerService.chordAnalized.id_concrete_chord ){
        ctx.fillStyle = ctx.strokeStyle
        ctx.fillRect(indexPosition - 5, y + 55, 75, 110 );
        this.cts.drawRectTextNotesLargeNeon(ctx, indexPosition, y + 180, scaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + scaleGrade?.concreteGrades[+key + 1].symbol+"");
        ctx.strokeStyle = "#000"
      } else {
        ctx.strokeRect(indexPosition - 5, y + 55, 75, 110 );
        this.cts.drawRectTextNotesLarge(ctx, indexPosition, y + 180, scaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + scaleGrade?.concreteGrades[+key + 1].symbol+"");
      }

      let concreteChordFinded = Object.values(this.elementsContainerService.progressionDetail.concreteGrades).find( concreteGrade => concreteGrade.id_concrete_chord == scaleGrade?.concreteGrades[+key + 1].id_concrete_chord);
      if( concreteChordFinded ){
        if(scaleGrade !== undefined){
          positionX[scaleGrade.concreteGrades[+key + 1].id_concrete_chord] = indexPosition + 30;
          colorX[scaleGrade.concreteGrades[+key + 1].id_concrete_chord] = +key;
        }
      }

      this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");
      this.cts.drawRectTextGrades(ctx, indexPosition, y + 120, this.signalsService.gradesI[+key] +"");

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 100);
      ctx.lineTo(20 + indexPosition,  y + 120);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 165);
      ctx.lineTo(20 + indexPosition,  y + 180);
      ctx.stroke();
      ctx.closePath();



      indexPosition += positions;
    }

    let positions_key = 800 / ( Object.values(this.elementsContainerService.progressionDetail.concreteGrades).length + 1 ) ;
    let indexPosition_key = 0;
    let positions_y_key = 50;
    let key_grades = this.elementsContainerService.progressionDetail.symbol.split("-");
    
    for( let key in this.elementsContainerService.progressionDetail.concreteGrades ){
      
      if( this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord == this.elementsContainerService.chordAnalized.id_concrete_chord ){
        ctx.strokeStyle = this.signalsService.colors[colorX[this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ] + 1];
        this.cts.drawRectTextNeon(ctx, indexPosition_key + (positions_key * +key) , y + 290 + (positions_y_key * +key),  key_grades[+key - 1] + "  ");
        this.cts.drawRectTextNotesLargeNeon(ctx, indexPosition_key + (positions_key * +key) , y + 240 + (positions_y_key * +key),  this.elementsContainerService.progressionDetail.concreteGrades[+key].tonic.symbol + this.elementsContainerService.progressionDetail.concreteGrades[+key].symbol);
      } else {
        ctx.strokeStyle = this.signalsService.colors[colorX[this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ] + 1];
        this.cts.drawRectText(ctx, indexPosition_key + (positions_key * +key) , y + 290 + (positions_y_key * +key),  key_grades[+key - 1] + "  ");
        this.cts.drawRectTextNotesLarge(ctx, indexPosition_key + (positions_key * +key) , y + 240 + (positions_y_key * +key),  this.elementsContainerService.progressionDetail.concreteGrades[+key].tonic.symbol + this.elementsContainerService.progressionDetail.concreteGrades[+key].symbol);  
      }

      ctx.beginPath();
      ctx.moveTo(positionX[ this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ], y + 220);
      ctx.lineTo(positionX[ this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ], y + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1 )));
      ctx.lineTo( (positions_key * +key) + 40,   y + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1)));
      ctx.lineTo( (positions_key * +key) + 40,   y + 240 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y + 330 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   410 - ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 - ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50);
      ctx.stroke();
      ctx.closePath();

      
      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y + 280 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   y + 290 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();
    }
  }
  
  private drawLinesProgressionScale(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.scaleDetail.notes).slice(0,-1);
    let positions = 800 / 9;

    let indexPosition = positions;

    let positionX: { [key: number]: number } = {};
    let colorX: { [key: number]: number } = {};

    for(let key in notes){

      ctx.strokeStyle = this.signalsService.colors[ +key + 1 ]
      
      let scaleGrade = this.elementsContainerService.concreteScaleGrades.find( sg => sg.idConcreteScaleGrade == this.elementsContainerService.scaleDetail.id_concrete_scale );
      
      ctx.strokeRect(indexPosition - 5, y + 55, 75, 110 );
      this.cts.drawRectTextNotesLarge(ctx, indexPosition, y + 180, scaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + scaleGrade?.concreteGrades[+key + 1].symbol+"");
 
      let concreteChordFinded = Object.values(this.elementsContainerService.progressionDetail.concreteGrades).find( concreteGrade => concreteGrade.id_concrete_chord == scaleGrade?.concreteGrades[+key + 1].id_concrete_chord);
      if( concreteChordFinded ){
        if(scaleGrade !== undefined){
          positionX[scaleGrade.concreteGrades[+key + 1].id_concrete_chord] = indexPosition + 30;
          colorX[scaleGrade.concreteGrades[+key + 1].id_concrete_chord] = +key;
        }
      }

      this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");
      this.cts.drawRectTextGrades(ctx, indexPosition, y + 120, this.signalsService.gradesI[+key] +"");

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 100);
      ctx.lineTo(20 + indexPosition,  y + 120);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(20 + indexPosition,  y + 165);
      ctx.lineTo(20 + indexPosition,  y + 180);
      ctx.stroke();
      ctx.closePath();



      indexPosition += positions;
    }

    let positions_key = 800 / ( Object.values(this.elementsContainerService.progressionDetail.concreteGrades).length + 1 ) ;
    let indexPosition_key = 0;
    let positions_y_key = 50;
    let key_grades = this.elementsContainerService.progressionDetail.symbol.split("-");
    
    for( let key in this.elementsContainerService.progressionDetail.concreteGrades ){

      ctx.strokeStyle = this.signalsService.colors[colorX[this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ] + 1];
      this.cts.drawRectText(ctx, indexPosition_key + (positions_key * +key) , y + 290 + (positions_y_key * +key),  key_grades[+key - 1] + "  ");
      this.cts.drawRectTextNotesLarge(ctx, indexPosition_key + (positions_key * +key) , y + 240 + (positions_y_key * +key),  this.elementsContainerService.progressionDetail.concreteGrades[+key].tonic.symbol + this.elementsContainerService.progressionDetail.concreteGrades[+key].symbol);  
      
      ctx.beginPath();
      ctx.moveTo(positionX[ this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ], y + 220);
      ctx.lineTo(positionX[ this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord ], y + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1 )));
      ctx.lineTo( (positions_key * +key) + 40,   y + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1)));
      ctx.lineTo( (positions_key * +key) + 40,   y + 240 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y + 330 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   410 - ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 - ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionDetail.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50);
      ctx.stroke();
      ctx.closePath();

      
      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y + 280 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   y + 290 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();
    }
  }


  
}
