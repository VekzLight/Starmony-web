import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { CanvasToolsService } from 'src/app/services/canvas-tools.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-analizer-chord',
  templateUrl: './analizer-chord.component.html',
  styleUrls: ['./analizer-chord.component.scss']
})
export class AnalizerChordComponent implements OnInit, AfterViewInit {


  @ViewChild('MatAccordionChord') accordionChord: MatAccordion;
  @ViewChild('detailCanvasInterval', { static: true }) canvasInterval: ElementRef<HTMLCanvasElement>;
  
  public ctxInterval: CanvasRenderingContext2D | null;

  scalesIdsKey: number[]; 
  progressionsIdsKey: number[];


  constructor(
    private cts :CanvasToolsService,
    public signalsService :SignalsService,
    public elementsContainerService:ElementsContainerService,
    private router: Router
  ) {
    if(this.elementsContainerService.chordAnalizedResp.exist){
      this.scalesIdsKey = Object.keys(this.elementsContainerService.chordAnalizedResp.concreteScalesIds).map( key => +key );
      this.progressionsIdsKey = Object.keys(this.elementsContainerService.chordAnalizedResp.concreteProgressionsIds).map( key => +key ); 
    }

    let ci = this.elementsContainerService.concreteIntervals.find( concreteInterva => this.elementsContainerService.chordAnalizedResp.concreteIntervalsIds[0] == concreteInterva.id_concrete_interval);
    if(ci) this.elementsContainerService.intervalDetail = ci;
  }
  ngAfterViewInit(): void {
    if(!this.canvasInterval.nativeElement.getContext)
      throw new Error(`2d context not supported or canvas already initialized`);

    this.ctxInterval = this.canvasInterval.nativeElement.getContext("2d");

    if(this.ctxInterval?.canvas !== undefined ){
      this.ctxInterval.canvas.height = 200 + ( (this.elementsContainerService.chordAnalizedResp.concreteIntervalsIds.length  + 1 )* 50 );
      this.ctxInterval.canvas.width = 800;
    }

    if(this.ctxInterval != null){
      this.ctxInterval.lineWidth = 1;

      if(this.ctxInterval)
        this.repaintCtxChord(this.ctxInterval);
    }
    
  }

  ngOnInit(): void {
  }

  public getConcreteIntervals(concreteChord: ConcreteChord):(ConcreteInterval|undefined)[]{
    if(concreteChord.id == -1) return [];
    return this.elementsContainerService.chordAnalizedResp.concreteIntervalsIds.map( idConcreteInterval => this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idConcreteInterval ) );
  }

  private repaintCtxChord( ctx: CanvasRenderingContext2D ){
    ctx.clearRect(0,0,  ctx.canvas.width, ctx.canvas.height);
    this.cts.drawRectText(ctx, 350, 10, this.elementsContainerService.chordAnalized.tonic.name + " " +this.elementsContainerService.chordAnalized.symbol + " ");
    this.drawLinesChord(ctx, 380, 10 + (this.cts.fontSize * 2));
  }


  public selectInterval(idInterval: number):void{
    let concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
    if(concreteInterval !== undefined && this.ctxInterval){
      this.elementsContainerService.intervalDetail = concreteInterval;
      this.repaintCtxChord( this.ctxInterval );
    }
  }

  public searchInterval(idInterval: number): string{
    var concreteInterval = this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idInterval );
    return concreteInterval?.name + " de " + concreteInterval?.firstNote.symbol + " a " + concreteInterval?.lastNote.symbol + " : " + concreteInterval?.semitones + " semitonos";
  }
  

  public scaleDetail(idScale: number): void{
    var concreteScale = this.elementsContainerService.concreteScales.find( concreteScale => concreteScale.id_concrete_scale == idScale );
    if(concreteScale !== undefined){
      this.signalsService.relatedAnalized = "scale"
      this.elementsContainerService.scaleDetail = concreteScale;
      localStorage.setItem("scaleDetail", JSON.stringify(concreteScale));
      localStorage.setItem("relatedAnalized", "scale");
    }

    this.router.navigate(['/home/element_detail']);
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

  public progressionDetail(idProgression: number): void{
    var concreteProgression = this.elementsContainerService.concreteProgressions.find( concreteProgression => concreteProgression.id_concrete_progression == idProgression );
    if(concreteProgression !== undefined){
      localStorage.setItem("progressionDetail", JSON.stringify(concreteProgression));
      localStorage.setItem("scaleDetail", JSON.stringify(this.elementsContainerService.concreteScales.find( concreteScale => concreteScale.id_concrete_scale == concreteProgression?.id_concrete_scale )));
      localStorage.setItem("relatedAnalized", "progression");


      this.signalsService.relatedAnalized = "progression"
      this.elementsContainerService.progressionDetail = concreteProgression;
      this.elementsContainerService.scaleDetail = JSON.parse(localStorage.getItem("scaleDetail") || JSON.stringify({id: - 1} as ConcreteScale));
    }

    this.router.navigate(['/home/element_detail']);
  }

  public searchScale(idScale: number): string{
    var concreteScale = this.elementsContainerService.concreteScales.find( concreteScale => concreteScale.id_concrete_scale == idScale );

    var key = this.elementsContainerService.chordAnalizedResp.concreteScalesIds[idScale];
    var notes: {[key:string]: Note};
    if( concreteScale?.notes !== undefined )  notes = concreteScale.notes;
    else notes = {}
    return this.signalsService.grades[key] + " Grado de la escala de " + concreteScale?.tonic.symbol + " " + concreteScale?.name + " : " + this.elementsContainerService.getNotes(Object.values(notes));
  }

  public searchProgression(idProgression: number): string{
    var concreteProgression = this.elementsContainerService.concreteProgressions.find( concreteProgression => concreteProgression.id_concrete_progression == idProgression );

    var positions = this.elementsContainerService.chordAnalizedResp.concreteProgressionsIds[idProgression];
    var stringPositions = "";
    var grades = "";

    for(var key in positions){
      let symbol: string = positions.length - 2 == +key ? " y " : ", ";
      stringPositions += this.signalsService.grades[positions[+key] - 1] + symbol;
    }

    for(var key in concreteProgression?.concreteGrades){
      grades += concreteProgression?.concreteGrades[key].tonic.symbol + "" +concreteProgression?.concreteGrades[key].symbol + " - ";
    }
    
      stringPositions = stringPositions.slice(0,-2);
      grades = grades.slice(0,-2);
    
    return stringPositions + " Posicion de la progresion " + concreteProgression?.symbol + " : " + grades;
  }







  private drawLinesChord(ctx: CanvasRenderingContext2D, x:number, y:number):void{

    let notes = Object.values(this.elementsContainerService.chordAnalized.notes);
    let positions = 800 / (notes.length + 1);

    let indexPosition = positions;

    let concreteIntervals = this.elementsContainerService.chordAnalizedResp.concreteIntervalsIds.map( idConcreteInterval => this.elementsContainerService.concreteIntervals.find( concreteInterval => concreteInterval.id_concrete_interval == idConcreteInterval ) );


    for(let key in notes){
      

      ctx.strokeStyle = this.signalsService.colors[key];


      if( notes[+key].id == this.elementsContainerService.intervalDetail.firstNote.id || notes[+key].id == this.elementsContainerService.intervalDetail.lastNote.id ) this.cts.drawRectTextNotesNeon(ctx, indexPosition, y + 60, notes[key].symbol+"");
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
        this.cts.drawRectTextNeon(ctx, (indexPosition) - (positions/2) - 50, y + 150 + ( 60 * (+key)), concreteIntervals[key]?.name + "");
      } else {
        this.cts.drawRectText(ctx, (indexPosition) - (positions/2) - 50, y + 150 + ( 60 * (+key)), concreteIntervals[key]?.name + "");
      }

      indexPosition -= positions;
    }
  }

}
