import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Tag } from 'src/app/interfaces/tag.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { CanvasToolsService } from 'src/app/services/canvas-tools.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-analizer-progression',
  templateUrl: './analizer-progression.component.html',
  styleUrls: ['./analizer-progression.component.scss']
})
export class AnalizerProgressionComponent implements OnInit, AfterViewInit {

  @ViewChild('MatAccordionScale') accordionScale: MatAccordion;
  @ViewChild('detailCanvasScale', { static: true }) canvasScale: ElementRef<HTMLCanvasElement>;

  
  @ViewChild('detailCanvasProgressionScale', { static: true }) canvasProgressionScale: ElementRef<HTMLCanvasElement>;
  @ViewChild('detailCanvasInterval', { static: true }) canvasInterval: ElementRef<HTMLCanvasElement>;

  public ctxInterval: CanvasRenderingContext2D | null;
  public ctxProgressionScale: CanvasRenderingContext2D | null;

  concreteIntervals: (ConcreteInterval|undefined)[] = [];


  public ctxScale: CanvasRenderingContext2D | null;
  private widthScreen: number = window.innerWidth;
  private heightScreen: number = window.innerHeight;


  constructor(
    private cdRef:ChangeDetectorRef,
    public  elementsContainerService: ElementsContainerService,
    public  signalsService: SignalsService,
    private router: Router,
    private cts :CanvasToolsService,
    private analyzerService:AnalyzerService) { }

    
  ngAfterViewInit(): void {
      let concreteInterval = this.elementsContainerService.concreteIntervals.find( _concreteInterval => _concreteInterval.id_concrete_interval == +this.elementsContainerService.scaleAnalizedResp.concreteIntervalsIds[0] );
      if(concreteInterval !== undefined)
        this.elementsContainerService.intervalDetail = concreteInterval;
  
  
      if(!this.canvasInterval.nativeElement.getContext)
        throw new Error(`2d context not supported or canvas already initialized`);
  
      this.ctxInterval = this.canvasInterval.nativeElement.getContext("2d");
  
      if(this.ctxInterval?.canvas !== undefined ){
        this.ctxInterval.canvas.height = 200 + ( (this.elementsContainerService.scaleAnalizedResp.concreteIntervalsIds.length  + 1 )* 50 );
        this.ctxInterval.canvas.width = 800;
      }
  
      if(this.ctxInterval != null){
        this.ctxInterval.lineWidth = 1;
  
        this.repaintCtxScale( this.ctxInterval );
      }
      
    

    if(!this.canvasScale.nativeElement.getContext)
      throw new Error(`2d context not supported or canvas already initialized`);

    this.ctxScale = this.canvasScale.nativeElement.getContext("2d");

    if(this.ctxScale?.canvas !== undefined){
      this.ctxScale.canvas.height = 400;
      this.ctxScale.canvas.width = 800;
    }

    if(this.ctxScale != null){
      this.ctxScale.lineWidth = 1;

      this.repaintCtxChord( this.ctxScale );
    }

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

  ngOnInit(): void {
  }

  public rePaintProgression (ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);

    this.cts.drawRectText(ctx, 330, 10, this.elementsContainerService.scaleDetail.tonic.name + " " +this.elementsContainerService.scaleDetail.symbol);
    this.drawLinesProgressionScale(ctx, 380, 10 + (this.cts.fontSize*2));
    this.cts.drawRectText(ctx, 330, 410 + (Object.values( this.elementsContainerService.progressionDetail.concreteGrades ).length ) * 50, this.elementsContainerService.progressionDetail.symbol);
  }

  public trackItem (index: number, item: (ConcreteInterval | undefined)) {
    return item?.id_concrete_interval;
  }

  public getTagsProgressionsOf(idProgression: number):Tag[]{
    if(idProgression !== undefined){
      var generos = this.elementsContainerService.tagProgressions.filter( tagProgression => tagProgression.progressionDTO.id == idProgression ).map( tagProgression => tagProgression.tagDTO );
      if(generos[0].id == 100) return [{id:100, name:"Desconocidos", description:"desconocidos", value:-1}];
      return this.elementsContainerService.tagProgressions.filter( tagProgression => tagProgression.progressionDTO.id == idProgression ).map( tagProgression => tagProgression.tagDTO );
    }  return [{id:100, name:"Desconocidos", description:"desconocidos", value:-1}];
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

  getGrades(concreteGrades: {[key: string]: ConcreteChord}):string{
    var stringCode = "";
    for( var key in concreteGrades )
      stringCode += concreteGrades[key].tonic.symbol + concreteGrades[key].symbol + " - ";
    
    
    return stringCode.slice(0,-2);
  }

  public getConcreteIntervalsResp(idConcreteIntervals: number[]):(ConcreteInterval|undefined)[]{
    return idConcreteIntervals.map( idConcreteInterval => this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idConcreteInterval ) );
  }

  public getConcreteIntervals(idConcreteChord: number):void{
    if(idConcreteChord == -1) return;

    this.analyzerService.analizeConcreteChord(idConcreteChord).subscribe( resp =>{
      this.elementsContainerService.chordAnalizedResp = resp;
      this.concreteIntervals = this.elementsContainerService.chordAnalizedResp.concreteIntervalsIds.map( idConcreteInterval => this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idConcreteInterval ) );
    });

     this.cdRef.detectChanges();
  }

  public getTypeChord(idConcreteChord: number): string{
    let concreteChord = this.elementsContainerService.concreteChords.find( concreteChord => concreteChord.id_concrete_chord == idConcreteChord );
    let types: {[key:number]:string} = { 3: "triada", 4:"Septima", 5:"Novena", 6:"Treceava" };
    if(concreteChord  !== undefined) return types[concreteChord.notes.length];
    return "";
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

  public group(idScale: number):string |undefined{
    let  tagScales = this.elementsContainerService.tagScales.find( (tagScale) => tagScale.scaleDTO.id == idScale );
    return tagScales?.tagDTO.name;
  }


  private repaintCtxChord( ctx: CanvasRenderingContext2D ){
    ctx.clearRect(0,0,  ctx.canvas.width, ctx.canvas.height);
    this.cts.drawRectText(ctx, 285, 10, this.elementsContainerService.scaleDetail.tonic.name + " " +this.elementsContainerService.scaleDetail.symbol);
    this.drawLinesGrades(ctx, 330, 10 + (this.cts.fontSize*2));
  }

  private repaintCtxScale( ctx: CanvasRenderingContext2D ){
    ctx.clearRect(0,0,  ctx.canvas.width,  ctx.canvas.height);
    this.cts.drawRectText(ctx, 350, 10, this.elementsContainerService.scaleAnalized.tonic.name + " " +this.elementsContainerService.scaleAnalized.symbol + " ");
    this.drawLinesScaleIntervals(ctx, 380, 10 + (this.cts.fontSize * 2));
  }

  public selectGrade(idChord: number):void{
    this.getConcreteIntervals(idChord);
    let concreteChord = this.elementsContainerService.concreteChords.find( concreteChord => concreteChord.id_concrete_chord == idChord );
    if( concreteChord !== undefined )
    this.elementsContainerService.chordAnalized = concreteChord;
    if( this.ctxScale !== null )
      this.repaintCtxChord( this.ctxScale );
  }

  public selectInterval(idInterval: number):void{
    let concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
    if(concreteInterval !== undefined && this.ctxInterval){
      this.elementsContainerService.intervalDetail = concreteInterval;
      this.repaintCtxScale( this.ctxInterval );
    }
  }

  public searchInterval(idInterval: number): string{
    var concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
    return concreteInterval?.name + " de " + concreteInterval?.firstNote.symbol + " a " + concreteInterval?.lastNote.symbol + " : " + concreteInterval?.semitones + " semitonos";
  }
  
  public searchProgression(idProgression: number): string{
    var concreteProgression = this.elementsContainerService.concreteProgressions.find( concreteProgression => concreteProgression.id_concrete_progression == idProgression );

    var grades = "";

    for(var key in concreteProgression?.concreteGrades){
      grades += concreteProgression?.concreteGrades[key].tonic.symbol + "" +concreteProgression?.concreteGrades[key].symbol + " - ";
    }
    
      grades = grades.slice(0,-2);
    
    return concreteProgression?.symbol + " : " + grades;
  }

  public intervalDetail(idInterval: number): void{
    var concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
    if(concreteInterval !== undefined){
      this.signalsService.relatedAnalized = "interval"
      this.elementsContainerService.intervalDetail = concreteInterval;
      localStorage.setItem("intervalDetail", JSON.stringify(concreteInterval));
      localStorage.setItem("relatedAnalized", "interval");
    }

    this.router.navigate(['/home/element_detail']);
  }

  public progressionDetail(idProgression: number):void{
    var concreteProgression = this.elementsContainerService.concreteProgressions.find( concreteProgression => concreteProgression.id_concrete_progression == idProgression );
    if( concreteProgression !== undefined ){
      var concreteScale = this.elementsContainerService.concreteScales.find( concreteScale => concreteScale.id_concrete_scale == concreteProgression?.id_concrete_scale );
      this.signalsService.relatedAnalized = "progression"
      this.elementsContainerService.progressionDetail = concreteProgression;
      if(concreteScale)
        this.elementsContainerService.scaleDetail = concreteScale;
      localStorage.setItem("progressionDetail", JSON.stringify(concreteProgression));
      localStorage.setItem("scaleDetail", JSON.stringify(concreteScale));
      localStorage.setItem("relatedAnalized", "progression")
    }

    this.router.navigate(['/home/element_detail']);
  }

  public searchChord(idConcreteChord: number):string{
    let concreteChord = this.elementsContainerService.concreteChords.find( concreteChord => concreteChord.id_concrete_chord == idConcreteChord );
    if(concreteChord !== undefined) return this.signalsService.gradesI[ this.elementsContainerService.scaleAnalizedResp.concreteChordsIds.indexOf(idConcreteChord) ] + " Grado"
    return ""
  }

  private drawLinesGrades(ctx: CanvasRenderingContext2D, x:number, y:number):void{
    let notes = Object.values(this.elementsContainerService.scaleDetail.notes).slice(0,-1);
    let positions = 800 / 9;

    let indexPosition = positions;
    for(let key in notes){
      let scaleGrade = this.elementsContainerService.concreteScaleGrades.find( sg => sg.idConcreteScaleGrade == this.elementsContainerService.scaleDetail.id_concrete_scale );
      

      ctx.strokeStyle = this.signalsService.colors[ +key + 1 ];


      if( Object.values(this.elementsContainerService.progressionAnalized.concreteGrades).some( concreteChord => concreteChord.id_concrete_chord == scaleGrade?.concreteGrades[+key + 1].id_concrete_chord) ){
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

  private drawLinesScaleIntervals(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.scaleAnalized.notes);
    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    let concreteIntervals = this.elementsContainerService.scaleAnalizedResp.concreteIntervalsIds.map( idConcreteInterval => this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idConcreteInterval ) );

    for(let key in notes){
    
      ctx.strokeStyle = this.signalsService.colors[key];
      if( notes[+key].id == this.elementsContainerService.intervalDetail.firstNote.id || notes[+key].id == this.elementsContainerService.intervalDetail.lastNote.id){
        this.cts.drawRectTextNotesNeon(ctx, indexPosition, y + 60, notes[+key].symbol+"");
      }
      else this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();

      if(+key == 0){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 100);
        ctx.lineTo(20 + indexPosition, y + 150);
        ctx.stroke();
        ctx.closePath();
      }


      if(+key != 0){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 100);
        ctx.lineTo(20 + indexPosition, y + 150 - (+key - 1) * 4);
        ctx.lineTo(20 + indexPosition - (positions * +key), y + 150 - (+key - 1) * 4);
        ctx.stroke();
        ctx.closePath();
      }
        
      indexPosition += positions;
    }


    indexPosition -= positions;
    
    for(let key in concreteIntervals.reverse()){
      ctx.strokeStyle = this.signalsService.colors[concreteIntervals.length - +key];
      ctx.beginPath();
      ctx.moveTo((indexPosition + 70) - positions/2 - 50, y + 150 - (concreteIntervals.length - +key -1) * 4);
      ctx.lineTo((indexPosition + 70) - positions/2 - 50, y + 150 + ( 60 * (+key)));
      ctx.stroke();
      ctx.closePath();

      if( concreteIntervals[key]?.id_concrete_interval == this.elementsContainerService.intervalDetail.id_concrete_interval ){
        this.cts.drawRectTextNeon(ctx, (indexPosition) - (positions/2) - 50, y + 150 + ( 60 * (+key)), concreteIntervals[key]?.name + " ");
      } else {
        this.cts.drawRectText(ctx, (indexPosition) - (positions/2) - 50, y + 150 + ( 60 * (+key)), concreteIntervals[key]?.name + " ");
      }

      indexPosition -= positions;
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
  
      let concreteChordFinded = Object.values(this.elementsContainerService.progressionAnalized.concreteGrades).find( concreteGrade => concreteGrade.id_concrete_chord == scaleGrade?.concreteGrades[+key + 1].id_concrete_chord);
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

    let positions_key = 800 / ( Object.values(this.elementsContainerService.progressionAnalized.concreteGrades).length + 1 ) ;
    let indexPosition_key = 0;
    let positions_y_key = 50;
    let key_grades = this.elementsContainerService.progressionAnalized.symbol.split("-");
    
    for( let key in this.elementsContainerService.progressionAnalized.concreteGrades ){

      ctx.strokeStyle = this.signalsService.colors[ colorX[this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord ] + 1 ];
      this.cts.drawRectText(ctx, indexPosition_key + (positions_key * +key) , y + 290 + (positions_y_key * +key),  key_grades[+key - 1] + "  ");
      this.cts.drawRectTextNotesLarge(ctx, indexPosition_key + (positions_key * +key) , y + 240 + (positions_y_key * +key),  this.elementsContainerService.progressionAnalized.concreteGrades[+key].tonic.symbol + this.elementsContainerService.progressionAnalized.concreteGrades[+key].symbol);  
      
      ctx.beginPath();
      ctx.moveTo(positionX[ this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord ], y + 220);
      ctx.lineTo(positionX[ this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord ], y + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord) + 1 )));
      ctx.lineTo( (positions_key * +key) + 40,   y + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord) + 1)));
      ctx.lineTo( (positions_key * +key) + 40,   y + 240 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y + 330 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   410 - ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.elementsContainerService.progressionAnalized.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 - ( 10 * (Object.keys(positionX).indexOf( "" + this.elementsContainerService.progressionAnalized.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.elementsContainerService.progressionAnalized.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 + (Object.values( this.elementsContainerService.progressionAnalized.concreteGrades ).length ) * 50);
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
