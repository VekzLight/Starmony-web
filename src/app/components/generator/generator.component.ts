import { Component, OnInit } from '@angular/core';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  // Intervals
  chordsGeneratedOfIntervals: ConcreteChord[] = [];
  scalesGeneratedOfIntervals: ConcreteScale[] = [];

  // Chords
  //intervalsCommonOfChords: ConcreteInterval[] = [];
  progressionsGeneratedOfChords: ConcreteProgression[] = [];
  scalesGeneratedOfChords: (ConcreteScale|undefined)[] = [];

  // Scales
  chordsCommonOfScales: ConcreteChord[] = [];
  intervalsCommonOfScales: ConcreteInterval[] = [];

  // Progressions
  chordsCommonOfProgressionInf: {[key: number]: number[]} = {};
  chordsCommonOfProgression: ConcreteChord[];

  constructor(
    public elementsContainerService:ElementsContainerService,
    public analyzerService:AnalyzerService,
    public signalsService:SignalsService
  ) {

  }

  ngOnInit(): void {

    // Intervalos
    [this.chordsGeneratedOfIntervals, this.scalesGeneratedOfIntervals] = this.analizeIntervals(this.elementsContainerService.musicalElementsAnalized.concreteIntervalIds);

    // Acordes
    [this.progressionsGeneratedOfChords, this.scalesGeneratedOfChords] = this.analizeChords(this.elementsContainerService.musicalElementsAnalized.concreteChordIds);

    // Escalas
    [this.chordsCommonOfScales, this.intervalsCommonOfScales] = this.analizeScales( this.elementsContainerService.musicalElementsAnalized.concreteScaleIds );

    // Progressiones
    this.chordsCommonOfProgressionInf = this.analizeProgressionsInf( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds );
    this.chordsCommonOfProgression = this.analizeProgressions( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds );

  }



  private analizeIntervals(concreteIntervalsIds: number[]):[ConcreteChord[], ConcreteScale[]]{
    let concreteChords: ConcreteChord[] = [];
    let concreteScales: ConcreteScale[] = [];

    if( concreteIntervalsIds.length != 0 ){
      // Acordes que se pueden formar
      if( concreteIntervalsIds.length >= 2 ){
        [concreteChords, concreteScales] =  this.chordsGeneratedOfIntervalsFunc(concreteIntervalsIds);
      }
    }

    return [ concreteChords, concreteScales ];
  }






  private analizeChords(concreteChordsIds: number[]):[ConcreteProgression[], (ConcreteScale | undefined)[]]{
    let concreteProgressions: ConcreteProgression[] = [];
    let concreteScales: (ConcreteScale | undefined)[] = [];

    if( concreteChordsIds.length != 0 ){
      // Relacion entre acordes
      if( concreteChordsIds.length >= 2 ){
        concreteProgressions= this.progressionsGeneratedOfChordsFunc( concreteChordsIds )
        concreteScales = this.scalesGeneratedOfConcreteProgressions( concreteProgressions )
      }
    }

    return [concreteProgressions, concreteScales];
  }




  private analizeScales(concreteScalesIds: number[]):[ConcreteChord[], ConcreteInterval[]]{
    let concreteChords: ConcreteChord[] = [];
    let concreteIntervals: ConcreteInterval[] = [];
    
    if( concreteScalesIds.length != 0 ){
      // Relacion entre Escalas
      if( concreteScalesIds.length >= 2 ){
        concreteChords = this.chordsCommonOfScalesFunc(concreteScalesIds);
        concreteIntervals = this.intervalsCommonOfScalesFunc( concreteScalesIds );
      }
    }

    return [concreteChords, concreteIntervals];
  }



  private analizeProgressionsInf(concreteProgressionIds: number[]): {[key: number]: number[]} {
    let concreteChords: {[key: number]: number[]} = {};

    if( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds.length != 0 ){
      //Elementos Comunes de progressiones
      this.signalsService.dominanceME = "progression";
      if( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds.length >= 2 ){
        concreteChords = this.commonChordProgressionInf( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds );
      } else{
        //Estructura de la progresion
      }
    }

    return concreteChords;
  }

  private analizeProgressions(concreteProgressionIds: number[]): ConcreteChord[] {
    let concreteChords: ConcreteChord[] = [];

    if( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds.length != 0 ){
      //Elementos Comunes de progressiones
      this.signalsService.dominanceME = "progression";
      if( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds.length >= 2 ){
        concreteChords = this.commonChordProgression( this.elementsContainerService.musicalElementsAnalized.concreteProgressionIds );
      } else{
        //Estructura de la progresion
      }
    }

    return concreteChords;
  }





  private intervalsCommonOfScalesFunc(concreteScalesIds: number[]):ConcreteInterval[]{
    let concreteScales = this.elementsContainerService.concreteScales.filter( concreteScale => concreteScalesIds.includes( concreteScale.id_concrete_scale ) );
    let concreteIntervals: ConcreteInterval[] = [];

    let notes: number[] = [];
    let tonics: number[] = [];
    concreteScales.map( concreteScale =>{
      tonics.push( concreteScale.tonic.id );
      Object.values(concreteScale.notes).map( subConcreteScale =>{
        notes.push(subConcreteScale.id);
      })
    });

    tonics = tonics.filter((item, index, self) => self.indexOf( item ) == index );
    notes = notes.filter( (item, index, self) => self.indexOf( item ) != index );
    notes = notes.filter( (item, index, self) => self.indexOf( item ) == index );

    concreteIntervals = this.elementsContainerService.concreteIntervals.filter( concreteInterval => tonics.includes(concreteInterval.firstNote.id) && notes.includes(concreteInterval.lastNote.id) );

    return concreteIntervals;
  }



  private chordsCommonOfScalesFunc(concreteScalesIds: number[]):ConcreteChord[]{
    let concreteScaleGrades = this.elementsContainerService.concreteScaleGrades.filter( concreteScaleGrade => concreteScalesIds.includes( concreteScaleGrade.idConcreteScaleGrade ));
    let concreteChords: ConcreteChord[] = [];

    for( let concreteScaleGrade of concreteScaleGrades )
      Object.values(concreteScaleGrade.concreteGrades).map( concreteChord => {concreteChords.push( concreteChord )} );
    
    concreteChords =  concreteChords.filter( (item, index, self) => self.map( subItem => subItem.id_concrete_chord ).indexOf( item.id_concrete_chord ) != index );
    concreteChords =  concreteChords.filter( (item, index, self) => self.map( subItem => subItem.id_concrete_chord ).indexOf( item.id_concrete_chord ) == index );

    return concreteChords;
  }





  private chordsGeneratedOfIntervalsFunc(concreteIntervalsIds: number[]): [ConcreteChord[], ConcreteScale[]]{
    let concreteIntervals: ConcreteInterval[] = this.elementsContainerService.concreteIntervals.filter( concreteInterval =>  concreteIntervalsIds.includes(concreteInterval.id_concrete_interval) );
    let notes: number[] = []

    concreteIntervals.map( concreteIntervals => {
      if(!notes.includes(concreteIntervals.firstNote.id)) notes.push(concreteIntervals.firstNote.id)
      if(!notes.includes(concreteIntervals.lastNote.id)) notes.push(concreteIntervals.lastNote.id)
    });

    let concreteChords: ConcreteChord[] = this.elementsContainerService.concreteChords.filter( concreteChord => notes.every( idNote => concreteChord.notes.map( note => note.id ).includes(idNote) ));

    let concreteScales: ConcreteScale[] = [];     
    if( concreteIntervalsIds.length >= 4 )
      concreteScales = this.elementsContainerService.concreteScales.filter( concreteScale => notes.every( idNote => Object.values(concreteScale.notes).map( note => note.id ).includes(idNote) ));

    return [concreteChords, concreteScales ];
  }

  private scalesGeneratedOfConcreteProgressions(concreteProgression: ConcreteProgression[]): (ConcreteScale|undefined)[]{
    return concreteProgression.map( concreteProgression => 
      this.elementsContainerService.concreteScales.find( concreteScale => 
        concreteScale.id_concrete_scale == concreteProgression.id_concrete_scale
      )
    ).filter((item, index, data) => data.findIndex( _it => _it?.id_concrete_scale == item?.id_concrete_scale) === index);
  }

  private progressionsGeneratedOfChordsFunc(idConcreteChords: number[]): ConcreteProgression[]{
    let concreteChords: ConcreteChord[] = this.elementsContainerService.concreteChords.filter( concreteChord => idConcreteChords.includes( concreteChord.id_concrete_chord ) );
    return this.elementsContainerService.concreteProgressions.filter( concreteProgression => 
      concreteChords.every( concreteChord =>  
        Object.values(concreteProgression.concreteGrades).map( concreteGrade =>
          concreteGrade.id_concrete_chord ).includes( concreteChord.id_concrete_chord
        )
      )
    ).filter((item, index, data) => data.findIndex( _it => _it.id_concrete_progression == item.id_concrete_progression) === index);
  }

  private commonChordProgressionInf( idProgressions: number[] ):{[key:number]: number[]}{
    let concreteChords: number[] = [];
    let idProgressionPos: number[] = [];
    let commonChords: {[key:number]: number[]}  = {};
    for( let idProgression of idProgressions){
      let concreteProgression = this.elementsContainerService.concreteProgressions.find( _concreteProgression => _concreteProgression.id_concrete_progression == idProgression);
      if(concreteProgression){
        Object.values( concreteProgression.concreteGrades ).map( _concreteChord => {
          if(!concreteChords.includes(_concreteChord.id_concrete_chord)) {concreteChords.push(_concreteChord.id_concrete_chord); idProgressionPos.push(idProgression)}
          else{
            if(commonChords[_concreteChord.id_concrete_chord])commonChords[_concreteChord.id_concrete_chord].push( idProgression );
            else commonChords[_concreteChord.id_concrete_chord] = [idProgression];
          }
        });
      }
    }
    return commonChords;
  }



  private commonChordProgression( idProgressions: number[] ): ConcreteChord[]{
    let concreteChords: ConcreteChord[] = [];

    let concreteProgressions = this.elementsContainerService.concreteProgressions.filter( _concreteProgression => idProgressions.includes(_concreteProgression.id_concrete_progression));

    concreteProgressions.map( concreteProgression => Object.values(concreteProgression.concreteGrades).map( concreteChord =>{
      concreteChords.push( concreteChord );
    }))

    concreteChords = concreteChords.filter( (concreteChord, index, self) => self.map( item => item.id_concrete_chord ).indexOf( concreteChord.id_concrete_chord ) !== index );
    concreteChords = concreteChords.filter( (concreteChord, index, self) => self.map( item => item.id_concrete_chord ).indexOf( concreteChord.id_concrete_chord ) === index );

    return concreteChords;
  }



  getGrades(concreteGrades: {[key: string]: ConcreteChord}):string{
    var stringCode = "";
    for( var key in concreteGrades )
      stringCode += concreteGrades[key].tonic.symbol + concreteGrades[key].symbol + " - ";
    
    
    return stringCode.slice(0,-2);
  }
}
