import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chord } from '../interfaces/chord.interface';
import { ConcreteChord } from '../interfaces/concreteChord.interface';
import { ConcreteInterval } from '../interfaces/concreteInterval.interface';
import { ConcreteProgression } from '../interfaces/concreteProgression.interface';
import { ConcreteScale } from '../interfaces/concreteScale.interface';
import { FilterChord } from '../interfaces/filterChord.interface';
import { FilterInterval } from '../interfaces/filterIntervals.interface';
import { FilterProgression } from '../interfaces/filterProgressions.interface';
import { FilterScale } from '../interfaces/filterScale.interface';
import { Note } from '../interfaces/note.interface';
import { OrderNotes } from '../interfaces/orderNotes.interface';
import { ScaleGrade } from '../interfaces/scaleGrade.interface';

@Injectable({
  providedIn: 'root'
})
export class SeekerResultElementsService{

  filter: FilterChord = {
    chordType:  {id: -1, name: "", symbol: "", code:""},
    adders:     -1,
    state:      "",

    name:       "",
    min:        1,
    max:        12,
    notes:      [],
    tonic:      {id: -1, name: "", symbol: ""},
    order:      []
  };
  
  filterScale: FilterScale = {
    groupIds:   [],
    code:       "",
    direction:  false,
    scalesIds:  [],

    name:       "",
    min:        1,
    max:        12,
    notes:      [],
    tonic:      {id: -1, name: "", symbol: ""},
    order:      []
  }

  filterProgression: FilterProgression = {
    cadence:  [],
    nChords:  -1,
    code:     "",
    beginChord: {id:-1, name:"", symbol:"", code:""},
    endChord:   {id:-1, name:"", symbol:"", code:""},

    name:       "",
    min:        1,
    max:        12,
    notes:      [],
    tonic:      {id: -1, name: "", symbol: ""},
    order:      []
  }

  filterInterval: FilterInterval = {
    semitones:  -1,
    type:       -1,
    direction:  -1,

    name:       "",
    min:        1,
    max:        12,
    notes:      [],
    tonic:      {id: -1, name: "", symbol: ""},
    order:      []
  }

  gradeTypes: {[key:string]: ScaleGrade[] } = {  };


  typeProgression: string = "";
  numberChords: string ="";

  positionsDisp: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
  orderNotes: Array<OrderNotes> = [];
  typeInterval: number = -1;
  direction: number = -1;

  firstChord: Chord;
  lastChord: Chord;

  type: string = "";

  dataSourceChord:        MatTableDataSource<ConcreteChord>       = new MatTableDataSource<ConcreteChord>([]);
  dataSourceScale:        MatTableDataSource<ConcreteScale>       = new MatTableDataSource<ConcreteScale>([]);
  dataSourceInterval:     MatTableDataSource<ConcreteInterval>    = new MatTableDataSource<ConcreteInterval>([]);
  dataSourceProgression:  MatTableDataSource<ConcreteProgression> = new MatTableDataSource<ConcreteProgression>([]);

  selectedChords: ConcreteChord[];
  selectedScales: ConcreteScale[];
  selectedProgressions: ConcreteProgression[];
  selectedIntervals: ConcreteInterval[];

  constructor() {
    if(this.selectedChords == undefined) this.selectedChords = [];
    if(this.selectedScales == undefined) this.selectedScales = [];
    if(this.selectedProgressions == undefined) this.selectedProgressions = [];
    if(this.selectedIntervals == undefined) this.selectedIntervals = [];

    this.gradeTypes["I"] = []
    this.gradeTypes["II"] = []
    this.gradeTypes["III"] = []
    this.gradeTypes["IV"] = []
    this.gradeTypes["V"] = []
    this.gradeTypes["VI"] = []
    this.gradeTypes["VII"] = []
  }

  public updateOrder():void{
    this.filter.order = this.orderNotes;
    this.dataSourceChord.filter = JSON.stringify(this.filter);

    this.filterScale.order = this.orderNotes;
    this.dataSourceScale.filter = JSON.stringify(this.filterScale);

    this.filterProgression.order = this.orderNotes;
    this.dataSourceProgression.filter = JSON.stringify(this.filterProgression);

    this.filterInterval.order = this.orderNotes;
    this.dataSourceInterval.filter = JSON.stringify(this.filterInterval);
  }

  public updateNotes(notes: Note[]):void{
    this.filter.notes = notes;
    this.dataSourceChord.filter = JSON.stringify(this.filter);

    this.filterScale.notes = notes;
    this.dataSourceScale.filter = JSON.stringify(this.filterScale);

    
    this.filterProgression.notes = notes;
    this.dataSourceProgression.filter = JSON.stringify(this.filterProgression);

    
    this.filterInterval.notes = notes;
    this.dataSourceInterval.filter = JSON.stringify(this.filterInterval);
  }

  public updateMin(min: number):void{
    this.filter.adders = -1;

    this.filter.min = min;
    this.dataSourceChord.filter = JSON.stringify(this.filter);
    
    this.filterScale.min = min;
    this.dataSourceScale.filter = JSON.stringify(this.filterScale);
    
    this.filterProgression.min = min;
    this.dataSourceProgression.filter = JSON.stringify(this.filterProgression);

    this.filterInterval.min = min;
    this.dataSourceInterval.filter = JSON.stringify(this.filterInterval);
  }

  public updateMax(max: number):void{
    this.filter.adders = -1;
    this.filter.max = max;
    this.dataSourceChord.filter = JSON.stringify(this.filter);
    
    this.filterScale.max = max;
    this.dataSourceScale.filter = JSON.stringify(this.filterScale);
    
    this.filterProgression.max = max;
    this.dataSourceProgression.filter = JSON.stringify(this.filterProgression);

    this.filterInterval.max = max;
    this.dataSourceInterval.filter = JSON.stringify(this.filterInterval);
  }

  public updateTonic(tonic: Note):void{
    this.filter.tonic = tonic;
    this.dataSourceChord.filter = JSON.stringify(this.filter);
    
    this.filterScale.tonic = tonic;
    this.dataSourceScale.filter = JSON.stringify(this.filterScale);
    
    this.filterProgression.tonic = tonic;
    this.dataSourceProgression.filter = JSON.stringify(this.filterProgression);
    
    this.filterInterval.tonic = tonic;
    this.dataSourceInterval.filter = JSON.stringify(this.filterInterval);
  }
}
