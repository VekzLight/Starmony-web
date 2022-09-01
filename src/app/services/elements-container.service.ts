import { Injectable } from '@angular/core';
import { Chord } from '../interfaces/chord.interface';
import { ChordAnalized } from '../interfaces/chordAnalized.interface';
import { ConcreteChord } from '../interfaces/concreteChord.interface';
import { ConcreteGradeScales } from '../interfaces/concreteGradeScales.interface';
import { ConcreteInterval } from '../interfaces/concreteInterval.interface';
import { ConcreteProgression } from '../interfaces/concreteProgression.interface';
import { ConcreteScale } from '../interfaces/concreteScale.interface';
import { Interval } from '../interfaces/interval.interface';
import { MusicalElementsAnalized } from '../interfaces/musicalElementsAnalize.interface';
import { MusicalElementsResponse } from '../interfaces/musicalElementsResponse.interface';
import { Note } from '../interfaces/note.interface';
import { Progression } from '../interfaces/progression.interface';
import { ProgressionAnalized } from '../interfaces/progressionAnalized.interface';
import { Scale } from '../interfaces/scale.interface';
import { ScaleAnalized } from '../interfaces/scaleAnalized.interface';
import { ScaleGrade } from '../interfaces/scaleGrade.interface';
import { Tag } from '../interfaces/tag.interface';
import { TagProgression } from '../interfaces/TagProgression.interface';
import { TagScale } from '../interfaces/tagScale.interface';
import { SeekerResultElementsService } from './seeker-result-elements.service';

@Injectable({
  providedIn: 'root'
})
export class ElementsContainerService {

  notes:        Note[]        = [];
  chords:       Chord[]       = [];
  scales:       Scale[]       = [];
  intervals:    Interval[]    = [];
  progressions: Progression[] = [];

  concreteChords: ConcreteChord[] = [];
  concreteScales: ConcreteScale[] = [];
  concreteIntervals:    ConcreteInterval[]    = [];
  concreteProgressions: ConcreteProgression[] = [];


  userConcreteIntervals:    number[] = [];
  userConcreteChords:       number[] = [];
  userConcreteScales:       number[] = [];
  userConcreteProgressions: number[] = [];

  notesSelected: Note[] = [];
  tonic: Note;

  concreteScaleGrades: ConcreteGradeScales[] = [];
  scaleGrades:  ScaleGrade[] = [];
  tagScales:    TagScale[] = [];
  tagProgressions:    TagProgression[] = [];

  tags: Tag[] = [];

  chordAnalized: ConcreteChord;
  chordAnalizedResp: ChordAnalized;

  scaleAnalized: ConcreteScale;
  scaleAnalizedResp: ScaleAnalized;

  progressionAnalized: ConcreteProgression;
  progressionAnalizedResp: ProgressionAnalized;

  scaleDetail: ConcreteScale;
  intervalDetail: ConcreteInterval;
  progressionDetail: ConcreteProgression;

  musicalElementsAnalized: MusicalElementsAnalized = {
    isEmpty : true,
    length_ : 0,
    concreteChordIds : [],
    concreteIntervalIds : [],
    concreteProgressionIds : [],
    concreteScaleIds : []
  }

  musicalElementsResponse: MusicalElementsResponse = {
    commonChords: [],
    commonIntervals: [],
    commonProgressions: [],
    commonScale: [],
    isEmpty: true
  }

  constructor(private seekerResultElementsService: SeekerResultElementsService) {
    let musicalElements = JSON.parse( localStorage.getItem("musicalElementsAnalized") || JSON.stringify( {isEmpty: true} as MusicalElementsAnalized ) );
    if( !musicalElements.isEmpty ) this.musicalElementsAnalized = musicalElements;

    this.chordAnalizedResp = JSON.parse( localStorage.getItem("chordAnalizedResp") || JSON.stringify( { exist: false } as ChordAnalized ) );
    this.chordAnalized = JSON.parse(localStorage.getItem("chordAnalized") || '{}');

    this.progressionAnalizedResp = JSON.parse( localStorage.getItem("progressionAnalizedResp") || JSON.stringify( { exist: false } as ProgressionAnalized ) );
    this.progressionAnalized = JSON.parse(localStorage.getItem("progressionAnalized") || '{}');

    this.scaleAnalizedResp = JSON.parse(localStorage.getItem("scaleAnalizedResp") || JSON.stringify( { exist: false } as ScaleAnalized ));
    this.scaleAnalized = JSON.parse(localStorage.getItem("scaleAnalized") || JSON.stringify({id: - 1} as ConcreteScale));

    this.scaleDetail = JSON.parse(localStorage.getItem("scaleDetail") || '{  }');
    this.intervalDetail = JSON.parse(localStorage.getItem("intervalDetail") || '{}');
    this.progressionDetail = JSON.parse(localStorage.getItem("progressionDetail") || '{}');

    this.userConcreteIntervals = JSON.parse(localStorage.getItem('userConcreteIntervals') || '[]');
    this.userConcreteChords = JSON.parse(localStorage.getItem('userConcreteChords') || '[]');
    this.userConcreteScales = JSON.parse(localStorage.getItem('userConcreteScales') || '[]');
    this.userConcreteProgressions = JSON.parse(localStorage.getItem('userConcreteProgressions') || '[]');
  }


  public addConcreteChordME(id: number):void{
    this.musicalElementsAnalized.concreteChordIds.push(id);
    this.musicalElementsAnalized.isEmpty = false;
    this.musicalElementsAnalized.length_ += 1;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }
  public addConcreteIntervalME(id: number):void{
    this.musicalElementsAnalized.concreteIntervalIds.push(id);
    this.musicalElementsAnalized.isEmpty = false;
    this.musicalElementsAnalized.length_ += 1;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }
  public addConcreteProgressionME(id: number):void{
    this.musicalElementsAnalized.concreteProgressionIds.push(id);
    this.musicalElementsAnalized.isEmpty = false;
    this.musicalElementsAnalized.length_ += 1;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }
  public addConcreteScaleME(id: number):void{
    this.musicalElementsAnalized.concreteScaleIds.push(id);
    this.musicalElementsAnalized.isEmpty = false;
    this.musicalElementsAnalized.length_ += 1;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }

  public removeConcreteChordME(id: number):void{
    this.musicalElementsAnalized.concreteChordIds = this.musicalElementsAnalized.concreteChordIds.filter( _id => _id !== id );
    this.musicalElementsAnalized.length_ -= 1;
    this.musicalElementsAnalized.isEmpty = this.musicalElementsAnalized.length_ == 0;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }
  public removeConcreteIntervaldME(id: number):void{
    this.musicalElementsAnalized.concreteIntervalIds = this.musicalElementsAnalized.concreteIntervalIds.filter( _id => _id !== id );
    this.musicalElementsAnalized.length_ -= 1;
    this.musicalElementsAnalized.isEmpty = this.musicalElementsAnalized.length_ == 0;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }
  public removeConcreteProgressionME(id: number):void{
    this.musicalElementsAnalized.concreteProgressionIds = this.musicalElementsAnalized.concreteProgressionIds.filter( _id => _id !== id );
    this.musicalElementsAnalized.length_ -= 1;
    this.musicalElementsAnalized.isEmpty = this.musicalElementsAnalized.length_ == 0;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }
  public removeConcreteScaleME(id: number):void{
    this.musicalElementsAnalized.concreteScaleIds = this.musicalElementsAnalized.concreteScaleIds.filter( _id => _id !== id );
    this.musicalElementsAnalized.length_ -= 1;
    this.musicalElementsAnalized.isEmpty = this.musicalElementsAnalized.length_ == 0;
    localStorage.setItem("musicalElementsAnalized", JSON.stringify(this.musicalElementsAnalized));
  }

  public selectTonic(tonic: Note):void{
    this.seekerResultElementsService.updateTonic(tonic);
  }

  // Selecciona una nota musical o la quita
  public selectNote(note: Note):void{
    if( !this.notesSelected.includes(note) ){
      this.notesSelected.push(note);
    } else {
      this.notesSelected.forEach((element,index)=>{
        if(element.id==note.id)this.notesSelected.splice(index,1);
      });
      if(note == this.seekerResultElementsService.filter.tonic) {
        this.seekerResultElementsService.filter.tonic = {id: -1, name:"", symbol:""};
        this.tonic = {id: -1, name:"", symbol:""};
      }
    }

    this.seekerResultElementsService.updateNotes(this.notesSelected);
  }

  public selectMin(min: number):void{
    this.seekerResultElementsService.updateMin(min);
  }

  public selectMax(max: number):void{
    this.seekerResultElementsService.updateMax(max);
  }

  public getNotes(notes: Note[]):string{
    let notesString = "";

    for(let i = 0; i < notes.length; i++){
      notesString += notes[i].symbol + " - ";
    }

    return notesString.slice(0,-2);
  }
}
