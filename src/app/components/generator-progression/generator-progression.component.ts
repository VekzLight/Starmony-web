import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteGradeScales } from 'src/app/interfaces/concreteGradeScales.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { Scale } from 'src/app/interfaces/scale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { CanvasToolsService } from 'src/app/services/canvas-tools.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { GeneratorService } from 'src/app/services/generator.service';
import { SignalsService } from 'src/app/services/signals.service';


@Component({
  selector: 'app-generator-progression',
  templateUrl: './generator-progression.component.html',
  styleUrls: ['./generator-progression.component.scss']
})
export class GeneratorProgressionComponent implements OnInit {

  @ViewChild('MatAccordionScale') accordionScale: MatAccordion;
  @ViewChild('detailCanvasProgression', { static: true }) canvasProgression: ElementRef<HTMLCanvasElement>;

  public ctxInterval: CanvasRenderingContext2D | null;
  public ctxProgression: CanvasRenderingContext2D | null;

  savedProgression: boolean = false;
  
  concreteIntervals: (ConcreteInterval|undefined)[];

  concreteScaleSelected: number = 0;
  concreteScaleCurrent: ConcreteScale;

  concreteChords: ConcreteChord[];
  concreteChordSelected: number = 1;
  concreteChordCurrent: ConcreteChord;

  concreteProgressiones: ConcreteProgression[];
  concreteProgressionSelected: number = 0;
  concreteProgressionCurrent: ConcreteProgression;

  concreteScales: ConcreteScale[];
  concreteScaleGrades: ConcreteGradeScales[];
  concreteScaleGrade: ConcreteGradeScales;

  notesChangered: Note[];
  tonic: Note;

  public ctxScale: CanvasRenderingContext2D | null;
  constructor(
    private cdRef:ChangeDetectorRef,
    public cts: CanvasToolsService,
    public signalsService: SignalsService,
    public generatorService:GeneratorService,
    public analyzerService:AnalyzerService,
    public elementsContainerService: ElementsContainerService) {

    }

  ngOnInit(): void {
    console.log(this.elementsContainerService.progressionGenerated);


    if(this.elementsContainerService.progressionGenerated.scales.length != 0){
      this.notesChangered = this.elementsContainerService.notes;
      this.tonic = this.notesChangered[0];


      this.concreteScales = this.elementsContainerService.concreteScales.filter( concreteScale => this.elementsContainerService.progressionGenerated.scales.some( scale => scale.id == concreteScale.id ) );
      this.concreteScaleCurrent = this.concreteScales[ this.concreteScaleSelected ]

      
      this.concreteScaleGrades = this.elementsContainerService.concreteScaleGrades.filter( concreteScaleGrade =>  concreteScaleGrade.idConcreteScaleGrade == this.concreteScaleCurrent.id_concrete_scale &&  !concreteScaleGrade.concreteGrades[1].code.includes("7") && !concreteScaleGrade.concreteGrades[1].code.includes("9"));
      this.concreteScaleGrade = this.concreteScaleGrades.find( _it => _it.concreteGrades[1].tonic.id == this.tonic.id ) || {id: -1} as ConcreteGradeScales;
    
      this.concreteChords = this.concreteScaleGrade.concreteGrades;
      
      this.concreteProgressiones = Object.values(this.elementsContainerService.progressionGenerated.concreteProgressions).filter( concreteProgression => concreteProgression.id_concrete_scale == this.concreteScaleCurrent.id_concrete_scale &&  !concreteProgression.concreteGrades[1].code.includes("7") && !concreteProgression.concreteGrades[1].code.includes("9") );
      this.concreteProgressionCurrent = this.concreteProgressiones[this.concreteProgressionSelected];
    }
  }

  ngAfterViewInit(): void {

    if(this.elementsContainerService.progressionGenerated.scales.length != 0){
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


  public saveProgression():void{
    this.generatorService.generateCompleteProgressionSave(this.elementsContainerService.progressionGenerated.progression.symbol).subscribe( resp => {
      this.savedProgression = resp.type == 1;
      this.elementsContainerService.progressionGenerated.saved = resp.type == 1;
      this.signalsService.progressionUpdate = true;
      localStorage.setItem("progressionUpdate", JSON.stringify("true"));
    });
  }

  public changeTonic(tonic: Note):void{
    this.concreteScaleSelected = tonic.id;
    this.tonic = tonic;

    this.concreteScaleCurrent = this.concreteScales[this.concreteScaleSelected - 1]

    this.concreteScaleGrades = this.elementsContainerService.concreteScaleGrades.filter( concreteScaleGrade =>  concreteScaleGrade.idConcreteScaleGrade == this.concreteScaleCurrent.id_concrete_scale &&  !concreteScaleGrade.concreteGrades[1].code.includes("7") && !concreteScaleGrade.concreteGrades[1].code.includes("9"));
    this.concreteScaleGrade = this.concreteScaleGrades.find( _it => _it.concreteGrades[1].tonic.id == this.tonic.id ) || {id: -1} as ConcreteGradeScales;



    this.concreteChords = this.concreteScaleGrade.concreteGrades;
    this.concreteProgressiones = Object.values(this.elementsContainerService.progressionGenerated.concreteProgressions).filter( concreteProgression => concreteProgression.id_concrete_scale == this.concreteScaleCurrent.id_concrete_scale &&  !concreteProgression.concreteGrades[1].code.includes("7") && !concreteProgression.concreteGrades[1].code.includes("9") );
    this.concreteProgressionCurrent = this.concreteProgressiones[0];


      

    if(this.ctxProgression != null){
      if(this.ctxProgression?.canvas !== undefined ){
        this.ctxProgression.canvas.height = 200 + 450 + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50;
        this.ctxProgression.canvas.width = 800 + ( this.concreteProgressionCurrent.symbol.length * 15 );
      }
      this.repaintCtxProgression( this.ctxProgression );
    }
  }

  public changeScale(scale: Scale):void{
    this.concreteScaleSelected = 0;
    this.tonic = this.notesChangered[0];

    let bufferTemp = this.concreteScales.find( concretescale => concretescale.id == scale.id && this.tonic.id == concretescale.tonic.id );

    if(bufferTemp !== undefined)
    this.concreteScaleCurrent = bufferTemp;


    this.concreteScaleGrades = this.elementsContainerService.concreteScaleGrades.filter( concreteScaleGrade =>  concreteScaleGrade.idConcreteScaleGrade == this.concreteScaleCurrent.id_concrete_scale &&  !concreteScaleGrade.concreteGrades[1].code.includes("7") && !concreteScaleGrade.concreteGrades[1].code.includes("9"));
    this.concreteScaleGrade = this.concreteScaleGrades.find( _it => _it.concreteGrades[1].tonic.id == this.tonic.id ) || {id: -1} as ConcreteGradeScales;


    this.concreteChords = this.concreteScaleGrade.concreteGrades;
    this.concreteProgressiones = Object.values(this.elementsContainerService.progressionGenerated.concreteProgressions).filter( concreteProgression => concreteProgression.id_concrete_scale == this.concreteScaleCurrent.id_concrete_scale &&  !concreteProgression.concreteGrades[1].code.includes("7") && !concreteProgression.concreteGrades[1].code.includes("9") );
    this.concreteProgressionCurrent = this.concreteProgressiones[0];


    if(this.ctxProgression != null){
      if(this.ctxProgression?.canvas !== undefined ){
        this.ctxProgression.canvas.height = 200 + 450 + (Object.values( this.concreteProgressionCurrent.concreteGrades ).length ) * 50;
        this.ctxProgression.canvas.width = 800 + ( this.concreteProgressionCurrent.symbol.length * 15 );
      }
      this.repaintCtxProgression( this.ctxProgression );
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

    private repaintCtxProgression( ctx: CanvasRenderingContext2D ){
      ctx.clearRect(0,0,  ctx.canvas.width,  ctx.canvas.height);
      this.cts.drawRectText(ctx, 350, 10, this.tonic.name + " " + this.concreteScaleCurrent.name);
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

    let notes = Object.values(this.concreteScaleCurrent.notes);
    

    let padd = 90;

    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    for(let key in notes){
      ctx.strokeStyle = this.signalsService.colors[key];
      this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");



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
    
   
  }
  

  private drawLinesScaleProgression(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.concreteScaleCurrent.notes);
    
    let padd = 90;

    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    let positionX: { [key: number]: number } = {};
    let colorX: { [key: number]: number } = {};

    for(let key in notes){
      ctx.strokeStyle = this.signalsService.colors[key];
      this.cts.drawRectTextNotes(ctx, indexPosition, y + 60, notes[key].symbol+"");

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
