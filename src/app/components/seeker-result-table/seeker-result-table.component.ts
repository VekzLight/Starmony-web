import { AfterViewInit, Component, OnInit, ChangeDetectorRef , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { ConcreteInterval } from 'src/app/interfaces/concreteInterval.interface';
import { ConcreteProgression } from 'src/app/interfaces/concreteProgression.interface';
import { ConcreteScale } from 'src/app/interfaces/concreteScale.interface';
import { FilterChord } from 'src/app/interfaces/filterChord.interface';
import { FilterInterval } from 'src/app/interfaces/filterIntervals.interface';
import { FilterProgression } from 'src/app/interfaces/filterProgressions.interface';
import { FilterScale } from 'src/app/interfaces/filterScale.interface';
import { Interval } from 'src/app/interfaces/interval.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { Progression } from 'src/app/interfaces/progression.interface';
import { Scale } from 'src/app/interfaces/scale.interface';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-seeker-result-table',
  templateUrl: './seeker-result-table.component.html',
  styleUrls: ['./seeker-result-table.component.scss']
})
export class SeekerResultTableComponent implements OnInit, AfterViewInit{

  displayedColumnsChord:    string[] = ['id', 'name', 'symbol', 'notes'];
  displayedColumnsScale:    string[] = ['id', 'name', 'symbol', 'notes', 'code'];
  displayedColumnsInterval: string[] = ['id', 'name', 'symbol', 'semitones', 'notes'];
  displayedColumnsProgression: string[] = ['id', 'name', 'code', 'grades'];


  @ViewChild('paginatorChord')    paginatorChord: MatPaginator;
  @ViewChild('paginatorScale')    paginatorScale: MatPaginator;
  @ViewChild('paginatorInterval') paginatorInterval: MatPaginator;
  @ViewChild('paginatorProgression') paginatorProgression: MatPaginator;

  @ViewChild(MatSort) matSort: MatSort;

  constructor(
      private elementsContainerService: ElementsContainerService,
      public seekerResultElementsService: SeekerResultElementsService,
      public signalsService: SignalsService,
      private changeDetectorRef: ChangeDetectorRef) {

    }

  ngOnInit(): void {
    this.filterPredicateChord();
    this.filterPredicateScale();
    this.filterPredicateProgression();
    this.filterPredicateInterval();
  }

  ngAfterViewInit(): void {

    this.seekerResultElementsService.dataSourceChord.data       = this.elementsContainerService.concreteChords;
    this.seekerResultElementsService.dataSourceScale.data       = this.elementsContainerService.concreteScales;
    this.seekerResultElementsService.dataSourceInterval.data    = this.elementsContainerService.concreteIntervals;
    this.seekerResultElementsService.dataSourceProgression.data = this.elementsContainerService.concreteProgressions;

    this.seekerResultElementsService.dataSourceChord.paginator = this.paginatorChord;
    this.seekerResultElementsService.dataSourceChord.sort = this.matSort;

    this.seekerResultElementsService.dataSourceScale.paginator = this.paginatorScale;
    this.seekerResultElementsService.dataSourceScale.sort = this.matSort;

    this.seekerResultElementsService.dataSourceProgression.paginator = this.paginatorProgression;
    this.seekerResultElementsService.dataSourceProgression.sort = this.matSort;

    this.seekerResultElementsService.dataSourceInterval.paginator = this.paginatorInterval;
    this.seekerResultElementsService.dataSourceInterval.sort = this.matSort;
    

    this.changeDetectorRef.detectChanges();
  }

  private filterPredicateInterval():void {
    this.seekerResultElementsService.dataSourceInterval.filterPredicate = function (data: ConcreteInterval, filter: string) {
      var filterJSON: FilterInterval = JSON.parse(filter);

      let isSemitones:    boolean = false;
      let isType:         boolean = false;
      let isDirection:    boolean = false;

      let isTonic:  boolean = false;
      let isNotes:  boolean = false;
      let isName:   boolean = false;

      if( filterJSON.direction != -1 ){
        if( filterJSON.direction == 1 ) isDirection = (((data.firstNote.id < data.lastNote.id) && data.semitones <= 11) || ( (data.lastNote.id < data.firstNote.id) &&  (data.semitones >= 11)));
        if( filterJSON.direction == 2 ) isDirection =  (((data.firstNote.id < data.lastNote.id) && data.semitones >= 11) || ( (data.lastNote.id < data.firstNote.id) &&  (data.semitones <= 11)));
      }
      else isDirection = true;

      if( filterJSON.type != -1 ){
        if(filterJSON.type == 1) isType = data.semitones <=  11;
        if(filterJSON.type == 2) isType = data.semitones >=  12;
      }
      else isType = true;

      if( filterJSON.semitones != null && filterJSON.semitones != -1) isSemitones = filterJSON.semitones == data.semitones;
      else isSemitones = true;

      if( filterJSON.name != "" ) isName = (data.name.trim().toLocaleLowerCase() + " de " + data.firstNote.name.trim().toLocaleLowerCase()).includes(filterJSON.name);
      else isName = true;

      if(filterJSON.tonic.id != -1) isTonic = data.firstNote.id == filterJSON.tonic.id;
      else isTonic = true;


      if(filterJSON.notes.length != 0){
        for( var note of filterJSON.notes)
          if(data.firstNote.id == note.id  || data.lastNote.id == note.id) isNotes = true;
      } else isNotes = true;

      return isTonic && isType && isNotes && isName && isSemitones && isType && isDirection;
    }
  }

  private filterPredicateChord():void {
    this.seekerResultElementsService.dataSourceChord.filterPredicate = function (data: ConcreteChord, filter: string) {
      var filterJSON: FilterChord = JSON.parse(filter);
      let isTonic:  boolean = false;
      let isType:   boolean = false;
      let isNotes:  boolean = false;
      let isMinMax: boolean = false;
      let isOrder:  boolean = false;
      let isName:   boolean = false;

      if( filterJSON.name != "" ) isName = (data.tonic.name.trim().toLocaleLowerCase()  + " "+ data.name.trim().toLocaleLowerCase()).includes(filterJSON.name);
      else isName = true;

      if( filterJSON.min <= data.notes.length && data.notes.length <= filterJSON.max ) isMinMax = true;
      
      if(filterJSON.tonic.id != -1) isTonic = data.tonic.id == filterJSON.tonic.id;
      else isTonic = true;

      if(filterJSON.chordType.id != -1) isType = data.id == filterJSON.chordType.id;
      else isType = true;

      if(filterJSON.notes.length != 0){
        for( var note of filterJSON.notes)
          if(data.notes.some( (_note) => _note.id == note.id )) isNotes = true;
      } else isNotes = true;

      if(filterJSON.order.length != 0){
        if( filterJSON.order[0].position == -1 ) isOrder = true;
        else
          for(let key in filterJSON.order){
            if( data.notes.some( (note) => note.id == filterJSON.order[key].note.id ) )
              isOrder = data.notes.findIndex( _note => _note.id == filterJSON.order[key].note.id ) == filterJSON.order[key].position - 1;
          }
      } else isOrder = true;

      return isTonic && isType && isNotes && isMinMax && isOrder && isName;
    }
  }

  private filterPredicateScale():void {
    this.seekerResultElementsService.dataSourceScale.filterPredicate = function (data: ConcreteScale, filter: string) {
      var filterJSON: FilterScale = JSON.parse(filter);
      let isCode:   boolean = false;

      let isGrade:  boolean = false;
      let isGroup:  boolean = false;
      let isTonic:  boolean = false;
      let isMinMax: boolean = false;
      let isNotes:  boolean = false;
      let isOrder:  boolean = false;
      let isName:   boolean = false;

      if( filterJSON.scalesIds.length != 0 ) isGrade = filterJSON.scalesIds.includes( data.id );
      else isGrade = true;

      if( filterJSON.code != "" ) isCode = data.code.trim().toLocaleLowerCase().startsWith(filterJSON.code.replace(/-/gi, "–"));
      else isCode = true;

      if( filterJSON.name != "" ) isName = (data.tonic.name.trim().toLocaleLowerCase()  + " " + data.name.trim().toLocaleLowerCase()).includes(filterJSON.name);
      else isName = true;

      if(filterJSON.groupIds.length != 0) isGroup = filterJSON.groupIds.includes( data.id );
      else isGroup = true;

      if( filterJSON.min <= Object.keys(data.notes).length && Object.keys(data.notes).length <= filterJSON.max ) isMinMax = true;
      
      if(filterJSON.tonic.id != -1) isTonic = data.tonic.id == filterJSON.tonic.id;
      else isTonic = true;

      if(filterJSON.notes.length != 0){
        for( var note of filterJSON.notes)
          if( Object.values(data.notes).some( (_note) => _note.id == note.id )) isNotes = true;
      } else isNotes = true;

      if(filterJSON.order.length != 0){
        if( filterJSON.order[0].position == -1 ) isOrder = true;
        else
          for(let key in filterJSON.order){
            if( Object.values(data.notes).some( (note) => note.id == filterJSON.order[key].note.id ) )
              isOrder = data.notes[filterJSON.order[key].position].id == filterJSON.order[key].note.id ;
          }
      } else isOrder = true;

      return isTonic && isNotes && isMinMax && isOrder && isName && isCode && isGroup && isGrade;
    }
  }

  private filterPredicateProgression():void {
    this.seekerResultElementsService.dataSourceProgression.filterPredicate = function (data: ConcreteProgression, filter: string) {
      var filterJSON: FilterProgression = JSON.parse(filter);
      let isCode:   boolean = false;
      let isCadence:boolean = false;
      let isbegin:  boolean = false;
      let isEnd:    boolean = false;

      let isTonic:  boolean = false;
      let isMinMax: boolean = false;
      let isNotes:  boolean = false;
      let isOrder:  boolean = false;
      let isName:   boolean = false;

      if( filterJSON.code != "" ) isCode = data.symbol.trim().toLocaleLowerCase().startsWith(filterJSON.code);
      else isCode = true;

      if( filterJSON.name != "" ) isName = (data.symbol.trim().toLocaleLowerCase() + data.name.trim().toLocaleLowerCase() + " " + data.name.trim().toLocaleLowerCase()).includes(filterJSON.name);
      else isName = true;

      if( filterJSON.beginChord.id != -1) isbegin = filterJSON.beginChord.id == data.concreteGrades[1].id;
      else isbegin = true;

      if( filterJSON.endChord.id != -1) isEnd = filterJSON.endChord.id == data.concreteGrades[Object.values(data.concreteGrades).length].id;
      else isEnd = true;

      if( filterJSON.cadence.length != 0 ) {
        let precadence = data.symbol.split("-");
        let preGrade  = precadence[precadence.length - 2];
        let lastGrade = precadence[precadence.length - 1];

        for(let cadence of filterJSON.cadence){
          let _precadence = cadence.split("-");
          let _preGrade = _precadence[0];
          let _lastGrade = _precadence[1];

          let preProbe = _preGrade == "*" ? true : _preGrade == preGrade;
          let lastProbe = _lastGrade == lastGrade;

          isCadence = preProbe && lastProbe;

          if(isCadence) break;
        }
      }
      else isCadence = true;


      let notes = Object.values(data.concreteGrades).map(concreteGrade => concreteGrade.tonic);

      if( filterJSON.min <= notes.length && notes.length <= filterJSON.max ) isMinMax = true;
      
      if(filterJSON.tonic.id != -1) isTonic = notes[0].id == filterJSON.tonic.id;
      else isTonic = true;

      if(filterJSON.notes.length != 0){
        for( var note of filterJSON.notes)
          if( notes.some( (_note) => _note.id == note.id )) isNotes = true;
      } else isNotes = true;

      if(filterJSON.order.length != 0){
        if( filterJSON.order[0].position == -1 ) isOrder = true;
        else
          for(let key in filterJSON.order){
            if( notes.some( (note) => note.id == filterJSON.order[+key].note.id ) )
              isOrder = notes.findIndex( note => note.id == filterJSON.order[+key].note.id) + 1 == filterJSON.order[+key].position
          }
      } else isOrder = true;

      return isTonic && isNotes && isMinMax && isOrder && isName && isCode && isCadence && isbegin && isEnd;
    }
  }

  applyFilterChord(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElementsService.filter.name = filterValue.trim().toLocaleLowerCase();
    this.seekerResultElementsService.dataSourceChord.filter = JSON.stringify(this.seekerResultElementsService.filter);

    if (this.seekerResultElementsService.dataSourceChord.paginator) {
      this.seekerResultElementsService.dataSourceChord.paginator.firstPage();
    }
  }

  applyFilterScale(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElementsService.filterScale.name = filterValue.trim().toLowerCase();
    this.seekerResultElementsService.dataSourceScale.filter = JSON.stringify(this.seekerResultElementsService.filterScale);

    if (this.seekerResultElementsService.dataSourceScale.paginator) {
      this.seekerResultElementsService.dataSourceScale.paginator.firstPage();
    }
  }

  applyFilterProgression(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElementsService.filterProgression.name  = filterValue.trim().toLowerCase();
    this.seekerResultElementsService.dataSourceProgression.filter = JSON.stringify(this.seekerResultElementsService.filterProgression);

    
    if (this.seekerResultElementsService.dataSourceProgression.paginator) {
      this.seekerResultElementsService.dataSourceProgression.paginator.firstPage();
    }
  }
  
  applyFilterInterval(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.seekerResultElementsService.filterInterval.name  = filterValue.trim().toLowerCase();
    this.seekerResultElementsService.dataSourceInterval.filter = JSON.stringify(this.seekerResultElementsService.filterInterval);

    if (this.seekerResultElementsService.dataSourceInterval.paginator) {
      this.seekerResultElementsService.dataSourceInterval.paginator.firstPage();
    }
  }




  public selectChord(concreteChord: ConcreteChord):void{
    if(this.seekerResultElementsService.selectedChords.includes(concreteChord)){
      this.seekerResultElementsService.selectedChords.forEach((element,index)=>{
        if(element.id_concrete_chord == concreteChord.id_concrete_chord) this.seekerResultElementsService.selectedChords.splice(index,1);
      });
    }
    else this.seekerResultElementsService.selectedChords.push(concreteChord);

    localStorage.setItem('concreteChordsSelecteds', JSON.stringify(this.seekerResultElementsService.selectedChords));
  }

  public selectScales(concreteScale: ConcreteScale):void{
    if(this.seekerResultElementsService.selectedScales.includes(concreteScale)){
      this.seekerResultElementsService.selectedScales.forEach((element,index)=>{
        if(element.id_concrete_scale == concreteScale.id_concrete_scale) this.seekerResultElementsService.selectedScales.splice(index,1);
      });
    }
    else this.seekerResultElementsService.selectedScales.push(concreteScale);
    localStorage.setItem('concreteScalesSelecteds', JSON.stringify(this.seekerResultElementsService.selectedScales));
  }

  public selectProgressions(concreteProgression: ConcreteProgression):void{
    if(this.seekerResultElementsService.selectedProgressions.includes(concreteProgression)){
      this.seekerResultElementsService.selectedProgressions.forEach((element,index)=>{
        if(element.id_concrete_progression == concreteProgression.id_concrete_progression) this.seekerResultElementsService.selectedProgressions.splice(index,1);
      });
    }
    else this.seekerResultElementsService.selectedProgressions.push(concreteProgression);
    localStorage.setItem('concreteProgressionsSelecteds', JSON.stringify(this.seekerResultElementsService.selectedProgressions));
  }

  public selectIntervals(concreteInterval: ConcreteInterval):void{
    if(this.seekerResultElementsService.selectedIntervals.includes(concreteInterval)){
      this.seekerResultElementsService.selectedIntervals.forEach((element,index)=>{
        if(element.id_concrete_interval == concreteInterval.id_concrete_interval) this.seekerResultElementsService.selectedIntervals.splice(index,1);
      });
    }
    else this.seekerResultElementsService.selectedIntervals.push(concreteInterval);
    localStorage.setItem('concreteIntervalsSelecteds', JSON.stringify(this.seekerResultElementsService.selectedIntervals));
  }


  getNotes(notes: Note[]):string{
    let notesString = "";

    for(let i = 0; i < notes.length; i++){
      notesString += notes[i].symbol + " - ";
    }

    return notesString.slice(0,-2);
  }

  getNotesScale(notes: any):string{
    let notesString = "";

    for(let key in notes)
      notesString += notes[key].symbol + " - ";

    return notesString.slice(0,-2);
  }

  getGrades(concreteGrades: {[key: string]: ConcreteChord}):string{
    var stringCode = "";
    for( var key in concreteGrades )
      stringCode += concreteGrades[key].tonic.symbol + concreteGrades[key].symbol + " - ";
    
    
    return stringCode.slice(0,-2);
  }
}
