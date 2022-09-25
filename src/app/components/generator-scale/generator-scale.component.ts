import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { CanvasToolsService } from 'src/app/services/canvas-tools.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-generator-scale',
  templateUrl: './generator-scale.component.html',
  styleUrls: ['./generator-scale.component.scss']
})
export class GeneratorScaleComponent implements OnInit {

  @ViewChild('MatAccordionScale') accordionScale: MatAccordion;
  @ViewChild('detailCanvasProgression', { static: true }) canvasProgression: ElementRef<HTMLCanvasElement>;
  @ViewChild('detailCanvasIntervals', { static: true }) canvasIntervals: ElementRef<HTMLCanvasElement>;

  public ctxInterval: CanvasRenderingContext2D | null;
  public ctxProgression: CanvasRenderingContext2D | null;

  concreteIntervals: (ConcreteInterval|undefined)[];

  intervals: number[];
  concreteIntervalsFiltered: ConcreteInterval[];

  concreteIntervalsSelected: ConcreteInterval;
  concreteScaleSelected: number = 1;
  concreteScaleCurrent: ConcreteScale;

  concreteChords: ConcreteChord[];
  concreteChordSelected: number = 1;
  concreteChordCurrent: ConcreteChord;

  concreteProgressiones: ConcreteProgression[];
  concreteProgressionSelected: number = 1;
  concreteProgressionCurrent: ConcreteProgression;

  concreteScaleGrades: ConcreteGradeScales[];
  concreteScaleGrade: ConcreteGradeScales;


  concreteProgresionSize: number;
  savedScale: boolean = false;

  notesChangered: Note[];
  tonic: Note;

  public ctxScale: CanvasRenderingContext2D | null;
  constructor(
    private cdRef:ChangeDetectorRef,
    public cts: CanvasToolsService,
    public signalsService: SignalsService,
    public analyzerService:AnalyzerService,
    public generatorService:GeneratorService,
    public elementsContainerService: ElementsContainerService) {

    }

  ngOnInit(): void {
    this.concreteProgresionSize = Object.values(this.elementsContainerService.scaleGenerated.concreteProgressions).length;
    console.log(this.elementsContainerService.scaleGenerated);

    this.notesChangered = this.elementsContainerService.notes;
    this.tonic = this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected].tonic;

    this.intervals = this.elementsContainerService.scaleGenerated.scaleIntervals.map( scaleInterval => scaleInterval.intervalOfScale.id ).sort( (ci1, ci2) => { return ci1 - ci2 }).slice( 0, this.elementsContainerService.scaleGenerated.scale.code.split("–").length );
    this.concreteIntervalsFiltered = this.elementsContainerService.concreteIntervals.filter( concreteInterval => (concreteInterval.firstNote.id == this.tonic.id) && ( this.intervals.includes( concreteInterval.id ) ) );
    this.concreteIntervalsSelected = this.concreteIntervalsFiltered[0];
    this.concreteScaleCurrent = this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected]

    
    this.concreteScaleGrades = Object.values(this.elementsContainerService.scaleGenerated.concreteScaleGrades).filter( concreteScaleGrade => concreteScaleGrade.id != -1 && !concreteScaleGrade.concreteGrades[1].code.includes("7") && !concreteScaleGrade.concreteGrades[1].code.includes("9"));
    this.concreteScaleGrade = this.concreteScaleGrades.find( _it => _it.concreteGrades[1].tonic.id == this.tonic.id ) || {id: -1} as ConcreteGradeScales;
  
  
    this.concreteChords = this.concreteScaleGrade.concreteGrades;
    this.concreteProgressiones = Object.values(this.elementsContainerService.scaleGenerated.concreteProgressions).filter( concreteProgression => concreteProgression.id_concrete_scale == this.concreteScaleCurrent.id_concrete_scale &&  !concreteProgression.concreteGrades[1].code.includes("7") && !concreteProgression.concreteGrades[1].code.includes("9") );
    this.concreteProgressionCurrent = this.concreteProgressiones[this.concreteProgressionSelected];
  }

  ngAfterViewInit(): void {
    
    if(!this.canvasIntervals.nativeElement.getContext)
      throw new Error(`2d context not supported or canvas already initialized`);

    this.ctxInterval = this.canvasIntervals.nativeElement.getContext("2d");

    if(this.ctxInterval?.canvas !== undefined ){
      this.ctxInterval.canvas.height = 200 + 400 + ( (this.intervals.length  + 1 ) * 50 );
      this.ctxInterval.canvas.width = 800;
    }

    if(this.ctxInterval != null){
      this.ctxInterval.lineWidth = 1;

      
      if(this.concreteScaleGrades.length != 0){
        this.repaintCtxScale( this.ctxInterval );
      } else this.repaintCtxScaleIntervals(  this.ctxInterval );
    }
  



    if( this.concreteProgresionSize != 0 ){
      if(!this.canvasProgression.nativeElement.getContext)
        throw new Error(`2d context not supported or canvas already initialized`);

      this.ctxProgression = this.canvasProgression.nativeElement.getContext("2d");

      if(this.ctxProgression?.canvas !== undefined ){
        this.ctxProgression.canvas.height = 200 + 450 + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50;
        this.ctxProgression.canvas.width = 800 + ( this.concreteProgressionCurrent.symbol.length * 5 );
      }

      if(this.ctxProgression != null){
        this.ctxProgression.lineWidth = 1;

        this.repaintCtxProgression( this.ctxProgression );
      }
    }
    
  }

  public saveScale():void{
    this.generatorService.generateCompleteScaleSave(this.elementsContainerService.scaleGenerated.scale.code).subscribe( resp => {
      this.savedScale = resp.type == 1;
      this.elementsContainerService.scaleGenerated.saved = true;
      this.signalsService.scaleUpdate = true;
      localStorage.setItem("scaleUpdate", JSON.stringify("true"));

    });
  }

  public changeTonic(tonic: Note):void{
    if(this.concreteProgresionSize != 0){
      this.concreteScaleSelected = tonic.id;
      this.tonic = tonic;
  
      this.intervals = this.elementsContainerService.scaleGenerated.scaleIntervals.map( scaleInterval => scaleInterval.intervalOfScale.id ).sort( (ci1, ci2) => { return ci1 - ci2 }).slice( 0, this.elementsContainerService.scaleGenerated.scale.code.split("–").length );
      this.concreteIntervalsFiltered = this.elementsContainerService.concreteIntervals.filter( concreteInterval => (concreteInterval.firstNote.id == this.tonic.id) && ( this.intervals.includes( concreteInterval.id ) ) );
      this.concreteIntervalsSelected = this.concreteIntervalsFiltered[0];
      this.concreteScaleCurrent = this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected]
  
      this.concreteScaleGrade = this.concreteScaleGrades.find( _it => _it.concreteGrades[1].tonic.id == this.tonic.id ) || {id: -1} as ConcreteGradeScales;
      this.concreteChords = this.concreteScaleGrade.concreteGrades;
      this.concreteProgressiones = Object.values(this.elementsContainerService.scaleGenerated.concreteProgressions).filter( concreteProgression => concreteProgression.id_concrete_scale == this.concreteScaleCurrent.id_concrete_scale &&  !concreteProgression.concreteGrades[1].code.includes("7") && !concreteProgression.concreteGrades[1].code.includes("9") );
      this.concreteProgressionCurrent = this.concreteProgressiones[0];
  
  
        
  
      if(this.ctxInterval != null){
        this.repaintCtxScale( this.ctxInterval );
      }
  
      if(this.ctxProgression != null){
        if(this.ctxProgression?.canvas !== undefined ){
          this.ctxProgression.canvas.height = 200 + 450 + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50;
          this.ctxProgression.canvas.width = 800 + ( this.concreteProgressionCurrent.symbol.length * 15 );
        }
        this.repaintCtxProgression( this.ctxProgression );
      }
    } else {
      this.concreteScaleSelected = tonic.id;
      this.tonic = tonic;
  
      this.intervals = this.elementsContainerService.scaleGenerated.scaleIntervals.map( scaleInterval => scaleInterval.intervalOfScale.id ).sort( (ci1, ci2) => { return ci1 - ci2 }).slice( 0, this.elementsContainerService.scaleGenerated.scale.code.split("–").length );
      this.concreteIntervalsFiltered = this.elementsContainerService.concreteIntervals.filter( concreteInterval => (concreteInterval.firstNote.id == this.tonic.id) && ( this.intervals.includes( concreteInterval.id ) ) );
      this.concreteIntervalsSelected = this.concreteIntervalsFiltered[0];
      this.concreteScaleCurrent = this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected]
  

      if(this.ctxInterval != null){
        this.repaintCtxScaleIntervals( this.ctxInterval );
      }
    }
    
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
  
    private repaintCtxScale( ctx: CanvasRenderingContext2D ){
      ctx.clearRect(0,0,  ctx.canvas.width,  ctx.canvas.height);
      this.cts.drawRectText(ctx, 350, 10, this.tonic.name + " " + this.elementsContainerService.scaleGenerated.scale.name);
      this.drawLinesScaleIntervals(ctx, 380, 10 + (this.cts.fontSize * 2));
    }

    private repaintCtxScaleIntervals( ctx: CanvasRenderingContext2D ){
      ctx.clearRect(0,0,  ctx.canvas.width,  ctx.canvas.height);
      this.cts.drawRectText(ctx, 350, 10, this.tonic.name + " " + this.elementsContainerService.scaleGenerated.scale.name);
      this.drawLinesScaleIntervalsOnly(ctx, 380, 10 + (this.cts.fontSize * 2));
    }

    private repaintCtxProgression( ctx: CanvasRenderingContext2D ){
      ctx.clearRect(0,0,  ctx.canvas.width,  ctx.canvas.height);
      this.cts.drawRectText(ctx, 350, 10, this.tonic.name + " " + this.elementsContainerService.scaleGenerated.scale.name);
      this.cts.drawRectText(ctx, 330, 410 + 170 + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50, this.concreteProgressionCurrent.symbol);
      this.drawLinesScaleProgression(ctx, 380, 10 + (this.cts.fontSize * 2));
    }
  
    public selectGrade(concreteChord: ConcreteChord):void{
      this.getConcreteIntervals(concreteChord.id_concrete_chord);
      if( concreteChord !== undefined )
      this.elementsContainerService.chordAnalized = concreteChord;
      if( this.ctxScale !== null )
        this.repaintCtxScale( this.ctxScale );
    }
  
    public selectInterval(idInterval: number):void{
      let concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
      if(concreteInterval !== undefined && this.ctxInterval){
        this.concreteIntervalsSelected = concreteInterval;

        if( this.concreteProgresionSize != 0 )
          this.repaintCtxScale( this.ctxInterval );
        else this.repaintCtxScaleIntervals(this.ctxInterval);
      }
    }
  
    public searchInterval(idInterval: number): string{
      var concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
      return concreteInterval?.name + " de " + concreteInterval?.firstNote.symbol + " a " + concreteInterval?.lastNote.symbol + " : " + concreteInterval?.semitones + " semitonos";
    }
    
    public searchProgression(concreteProgression: ConcreteProgression): string{
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
      }
  
    }
  
    public progressionDetail(concreteProgression: ConcreteProgression):void{
      if( concreteProgression !== undefined ){
        this.concreteProgressionSelected =concreteProgression.id_concrete_progression;
        this.concreteProgressionCurrent = concreteProgression;
      }
      if(this.ctxProgression != null){

        if(this.ctxProgression?.canvas !== undefined ){
          this.ctxProgression.canvas.height = 200 + 450 + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50;
          this.ctxProgression.canvas.width = 800 + ( this.concreteProgressionCurrent.symbol.length * 15 );
        }

        this.repaintCtxProgression( this.ctxProgression );
      }
    }

    
  public trackItem (index: number, item: (ConcreteInterval | undefined)) {
    return item?.id_concrete_interval;
  }
  
  private drawLinesScaleIntervals(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected].notes);
    

    let padd = 90;

    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    for(let key in notes){
      ctx.strokeStyle = this.signalsService.colors[key];
      if( notes[+key].id == this.concreteIntervalsSelected.firstNote.id || notes[+key].id == this.concreteIntervalsSelected.lastNote.id){
        this.cts.drawRectTextNotesNeon(ctx, indexPosition, y + 60, notes[+key].symbol+"");
      }
      else this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");



      if(+key < notes.length - 1 ){
        if(this.concreteScaleGrade?.concreteGrades[+key + 1].id_concrete_chord == this.concreteChordSelected){
          ctx.fillStyle = ctx.strokeStyle
          ctx.fillRect(indexPosition - 5, y + 55, 75, 230 );
          this.cts.drawRectTextNotesLargeNeon(ctx, indexPosition, y + 300, this.concreteScaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + this.concreteScaleGrade?.concreteGrades[+key + 1].symbol+"");      
          ctx.strokeStyle = "#000"
        } else {
          ctx.strokeRect(indexPosition - 5, y + 55, 75, 230 );
          this.cts.drawRectTextNotesLarge(ctx, indexPosition, y + 300, this.concreteScaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + this.concreteScaleGrade?.concreteGrades[+key + 1].symbol+"");      
        }
      

        this.cts.drawRectTextGrades(ctx, indexPosition, y + 350, this.signalsService.gradesI[+key] +"");
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

      }

    
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();


      if(+key == 0){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 300 + padd);
        ctx.lineTo(20 + indexPosition, y + 350 + padd);
        ctx.stroke();
        ctx.closePath();
      }


      if(+key != 0 && +key != notes.length - 1){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 300 + padd);
        ctx.lineTo(20 + indexPosition, y + 350 + padd- (+key - 1) * 4);
        ctx.lineTo(20 + indexPosition - (positions * +key), y + 350 + padd - (+key - 1) * 4);
        ctx.stroke();
        ctx.closePath();
      }

      if(+key == notes.length - 1){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 100);
        ctx.lineTo(20 + indexPosition, y + 350 + padd- (+key - 1) * 4);
        ctx.lineTo(20 + indexPosition - (positions * +key), y + 350 + padd - (+key - 1) * 4);
        ctx.stroke();
        ctx.closePath();
      }
        
      indexPosition += positions;
    }


    indexPosition -= positions;
    
    for(let key in this.concreteIntervalsFiltered.reverse()){
      ctx.strokeStyle = this.signalsService.colors[this.concreteIntervalsFiltered.length - +key];
      ctx.beginPath();
      ctx.moveTo((indexPosition + 70) - positions/2 - 50, y + 350 + padd - (this.concreteIntervalsFiltered.length - +key -1) * 4);
      ctx.lineTo((indexPosition + 70) - positions/2 - 50, y + 350 + padd + ( 60 * (+key)));
      ctx.stroke();
      ctx.closePath();

      if( this.concreteIntervalsFiltered[key]?.id_concrete_interval == this.concreteIntervalsSelected.id_concrete_interval ){
        this.cts.drawRectTextNeon(ctx, (indexPosition) - (positions/2) - 50, y + padd + 350 + ( 60 * (+key)), this.concreteIntervalsFiltered[key]?.name + " ");
      } else {
        this.cts.drawRectText(ctx, (indexPosition) - (positions/2) - 50, y + 350 + padd + ( 60 * (+key)), this.concreteIntervalsFiltered[key]?.name + " ");
      }

      indexPosition -= positions;
    }

    this.concreteIntervalsFiltered.reverse();
  }
  
  private drawLinesScaleIntervalsOnly(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected].notes);
    

    let padd = 90;

    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    for(let key in notes){
      ctx.strokeStyle = this.signalsService.colors[key];
      if( notes[+key].id == this.concreteIntervalsSelected.firstNote.id || notes[+key].id == this.concreteIntervalsSelected.lastNote.id){
        this.cts.drawRectTextNotesNeon(ctx, indexPosition, y + 60, notes[+key].symbol+"");
      }
      else this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");



      if(+key < notes.length - 1 ){
         
        ctx.strokeRect(indexPosition - 5, y + 55, 75, 230 );
        this.cts.drawRectTextNotesLarge(ctx, indexPosition, y + 300, notes[+key].symbol + "?");      

        this.cts.drawRectTextGrades(ctx, indexPosition, y + 350, this.signalsService.gradesI[+key] +"");
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

      }

    
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();


      if(+key == 0){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 300 + padd);
        ctx.lineTo(20 + indexPosition, y + 350 + padd);
        ctx.stroke();
        ctx.closePath();
      }


      if(+key != 0 && +key != notes.length - 1){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 300 + padd);
        ctx.lineTo(20 + indexPosition, y + 350 + padd- (+key - 1) * 4);
        ctx.lineTo(20 + indexPosition - (positions * +key), y + 350 + padd - (+key - 1) * 4);
        ctx.stroke();
        ctx.closePath();
      }

      if(+key == notes.length - 1){
        ctx.beginPath();
        ctx.moveTo(20 + indexPosition, y + 100);
        ctx.lineTo(20 + indexPosition, y + 350 + padd- (+key - 1) * 4);
        ctx.lineTo(20 + indexPosition - (positions * +key), y + 350 + padd - (+key - 1) * 4);
        ctx.stroke();
        ctx.closePath();
      }
        
      indexPosition += positions;
    }


    indexPosition -= positions;
    
    for(let key in this.concreteIntervalsFiltered.reverse()){
      ctx.strokeStyle = this.signalsService.colors[this.concreteIntervalsFiltered.length - +key];
      ctx.beginPath();
      ctx.moveTo((indexPosition + 70) - positions/2 - 50, y + 350 + padd - (this.concreteIntervalsFiltered.length - +key -1) * 4);
      ctx.lineTo((indexPosition + 70) - positions/2 - 50, y + 350 + padd + ( 60 * (+key)));
      ctx.stroke();
      ctx.closePath();

      if( this.concreteIntervalsFiltered[key]?.id_concrete_interval == this.concreteIntervalsSelected.id_concrete_interval ){
        this.cts.drawRectTextNeon(ctx, (indexPosition) - (positions/2) - 50, y + padd + 350 + ( 60 * (+key)), this.concreteIntervalsFiltered[key]?.name + " ");
      } else {
        this.cts.drawRectText(ctx, (indexPosition) - (positions/2) - 50, y + 350 + padd + ( 60 * (+key)), this.concreteIntervalsFiltered[key]?.name + " ");
      }

      indexPosition -= positions;
    }

    this.concreteIntervalsFiltered.reverse();
  }
  

  private drawLinesScaleProgression(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.scaleGenerated.concreteScales[this.concreteScaleSelected].notes);
    
    let padd = 90;

    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    let positionX: { [key: number]: number } = {};
    let colorX: { [key: number]: number } = {};

    for(let key in notes){
      ctx.strokeStyle = this.signalsService.colors[key];
      if( notes[+key].id == this.concreteIntervalsSelected.firstNote.id || notes[+key].id == this.concreteIntervalsSelected.lastNote.id){
        this.cts.drawRectTextNotesNeon(ctx, indexPosition, y + 60, notes[+key].symbol+"");
      }
      else this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");


      if(+key < notes.length - 1 ){
        if(this.concreteScaleGrade?.concreteGrades[+key + 1].id_concrete_chord == this.concreteChordSelected){
          ctx.fillStyle = ctx.strokeStyle
          ctx.fillRect(indexPosition - 5, y + 55, 75, 230 );
          this.cts.drawRectTextNotesLargeNeon(ctx, indexPosition, y + 300, this.concreteScaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + this.concreteScaleGrade?.concreteGrades[+key + 1].symbol+"");      
          ctx.strokeStyle = "#000"
        } else {
          ctx.strokeRect(indexPosition - 5, y + 55, 75, 230 );
          this.cts.drawRectTextNotesLarge(ctx, indexPosition, y + 300, this.concreteScaleGrade?.concreteGrades[+key + 1].tonic.symbol + "" + this.concreteScaleGrade?.concreteGrades[+key + 1].symbol+"");      
        }
      

        this.cts.drawRectTextGrades(ctx, indexPosition, y + 350, this.signalsService.gradesI[+key] +"");
        this.cts.drawRectTextNotes(ctx, indexPosition, y + 120, notes[key].symbol+"");
  
        if( Object.values(this.concreteProgressionCurrent.concreteGrades).some( concreteGrade => this.concreteScaleGrade?.concreteGrades[+key + 1].id_concrete_chord == concreteGrade.id_concrete_chord) ){
          if(this.concreteScaleGrade!== undefined){
            positionX[this.concreteScaleGrade.concreteGrades[+key + 1].id_concrete_chord] = indexPosition + 30;
            colorX[this.concreteScaleGrade.concreteGrades[+key + 1].id_concrete_chord] = +key;
          }
        }
  
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

      }
    
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x,   y + 50);
      ctx.lineTo(20 + indexPosition,  y + 50);
      ctx.lineTo(20 + indexPosition,  y + 60);
      ctx.stroke();
      ctx.closePath();



      indexPosition += positions;
    }

    let positions_key =800 / (notes.length + 1);
    let indexPosition_key = 0;
    let positions_y_key = 50;
    let desplace = 170;
    let key_grades = this.concreteProgressionCurrent.symbol.split("-");
    
    for( let key in this.concreteProgressionCurrent.concreteGrades ){

      ctx.strokeStyle = this.signalsService.colors[colorX[this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord ] + 1];
      this.cts.drawRectText(ctx, indexPosition_key + (positions_key * +key) , y+ desplace + 290 + (positions_y_key * +key),  key_grades[+key - 1] + "  ");
      this.cts.drawRectTextNotesLarge(ctx, indexPosition_key + (positions_key * +key) , y+ desplace + 240 + (positions_y_key * +key),  this.concreteProgressionCurrent.concreteGrades[+key].tonic.symbol + this.concreteProgressionCurrent.concreteGrades[+key].symbol);  
      
      ctx.beginPath();
      ctx.moveTo(positionX[ this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord ], y+ desplace + 220);
      ctx.lineTo(positionX[ this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord ], y + desplace+ 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord) + 1 )));
      ctx.lineTo( (positions_key * +key) + 40,   y+ desplace + 220 + ( 10 * (Object.keys(positionX).indexOf( "" + this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord) + 1)));
      ctx.lineTo( (positions_key * +key) + 40,   y+ desplace + 240 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y + desplace+ 330 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   410+ desplace - ( 10 * (Object.keys(positionX).indexOf( "" + this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 + desplace- ( 10 * (Object.keys(positionX).indexOf( "" + this.concreteProgressionCurrent.concreteGrades[+key].id_concrete_chord) + 1)) + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50);
      ctx.lineTo( 350,   410 + desplace+ (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50);
      ctx.stroke();
      ctx.closePath();

      
      ctx.beginPath();
      ctx.moveTo((positions_key * +key) + 10,   y+ desplace + 280 + (positions_y_key * +key));
      ctx.lineTo((positions_key * +key) + 10,   y+ desplace + 290 + (positions_y_key * +key));
      ctx.stroke();
      ctx.closePath();
    }

  }

}
