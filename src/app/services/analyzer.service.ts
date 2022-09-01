import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConcreteChordME } from '../interfaces/concreteChordME.interface';
import { ConcreteIntervalME } from '../interfaces/concreteIntervalME.interface';
import { ConcreteScaleME } from '../interfaces/concreteScaleME.interface';
import { ConcreteScale } from '../interfaces/concreteScale.interface';
import { ConcreteGradeScales } from '../interfaces/concreteGradeScales.interface';
import { Observable } from 'rxjs';
import { ConcreteInterval } from '../interfaces/concreteInterval.interface';
import { ConcreteChord } from '../interfaces/concreteChord.interface';
import { ConcreteProgressionME } from '../interfaces/concreteProgressionME.interface';
import { ConcreteProgression } from '../interfaces/concreteProgression.interface';
import { Scale } from '../interfaces/scale.interface';
import { Progression } from '../interfaces/progression.interface';
import { Tag } from '../interfaces/tag.interface';
import { Note } from '../interfaces/note.interface';
import { Interval } from '../interfaces/interval.interface';
import { Chord } from '../interfaces/chord.interface';
import { TagScale } from '../interfaces/tagScale.interface';
import { ScaleGrade } from '../interfaces/scaleGrade.interface';
import { ChordAnalized } from '../interfaces/chordAnalized.interface';
import { TagProgression } from '../interfaces/TagProgression.interface';
import { ScaleAnalized } from '../interfaces/scaleAnalized.interface';
import { ProgressionAnalized } from '../interfaces/progressionAnalized.interface';
import { MusicalElementsAnalized } from '../interfaces/musicalElementsAnalize.interface';
import { MusicalElementsResponse } from '../interfaces/musicalElementsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {
  private uri = "http://localhost:8080/api/analyzer";

  constructor(private http: HttpClient) { }


  
  public getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(this.uri+"/tag");
  }
  
  public getAllTagsScale():Observable<TagScale[]>{
    return this.http.get<TagScale[]>(this.uri+"/tag/scale");
  }
  
  public getAllTagsProgression():Observable<TagProgression[]>{
    return this.http.get<TagProgression[]>(this.uri+"/tag/progression");
  }

  public getAllNotes():Observable<Note[]>{
    return this.http.get<Note[]>(this.uri+"/note");
  }

  public getAllIntervals():Observable<Interval[]>{
    return this.http.get<Interval[]>(this.uri+"/interval");
  }

  public getAllChords():Observable<Chord[]>{
    return this.http.get<Chord[]>(this.uri+"/chord");
  }

  public getAllScales():Observable<Scale[]>{
    return this.http.get<Scale[]>(this.uri+"/scale");
  }

  public getAllProgressions():Observable<Progression[]>{
    return this.http.get<Progression[]>(this.uri+"/progression");
  }

  public getAllConcreteChords():Observable<ConcreteChord[]>{
    return this.http.get<ConcreteChord[]>(this.uri+"/chord/concrete");
  }
  
  public getAllConcreteScales():Observable<ConcreteScale[]>{
    return this.http.get<ConcreteScale[]>(this.uri+"/scale/concrete");
  }

  public getAllConcreteIntervals():Observable<ConcreteInterval[]>{
    return this.http.get<ConcreteInterval[]>(this.uri+"/interval/concrete");
  }

  public getAllConcreteProgressions():Observable<ConcreteProgression[]>{
    return this.http.get<ConcreteProgression[]>(this.uri+"/progression/concrete");
  }

  public getAllScaleGrades():Observable<ScaleGrade[]>{
    return this.http.get<ScaleGrade[]>(this.uri + "/chord/scale");
  }

  public getAllConcreteScaleGrades():Observable<ConcreteGradeScales[]>{
    return this.http.get<ConcreteGradeScales[]>(this.uri + "/chord/scale/concrete");
  }



  public getConcreteIntervalWithNotes(firstNote: number, lastNote: number):Observable<any>{
    return this.http.get<ConcreteInterval>(this.uri+"/interval/concrete/i");
  }

  public getConcreteScaleByIdAndTonic(scale: Scale, tonic: Note):Observable<ConcreteScale>{
    return this.http.get<ConcreteScale>(this.uri+"/scale/concrete/s/"+scale.id+"/t/"+tonic.id);
  }



  public getScaleById(id: number):Observable<Scale>{
    return this.http.get<Scale>(this.uri+"/scale/"+id);
  }

  public getProgressionById(id: number):Observable<Progression>{
    return this.http.get<Progression>(this.uri+"/progression/"+id);
  }




  getConcreteChordsWithME(concreteChordME: ConcreteChordME): any{
    return this.http.post<any>(this.uri+"/chord/concrete/me", concreteChordME);
  }

  getConcreteScalesWithME(concreteScaleME: ConcreteScaleME): any{
    return this.http.post<any>(this.uri+"/scale/concrete/me", concreteScaleME);
  }

  getConcreteIntervalsWithME(concreteIntervalME: ConcreteIntervalME): any{
    return this.http.post<any>(this.uri+"/interval/concrete/me", concreteIntervalME);
  }

  getConcreteProgressionsOfME(concreteProgressionME: ConcreteProgressionME):any{
    return this.http.post<any>(this.uri+"/progression/concrete/me", concreteProgressionME);
  }

  getConcreteGradesOfConcretescale(concreteScale: ConcreteScale):Observable<ConcreteGradeScales>{
    return this.http.post<any>(this.uri+"/chord/concrete/scale/concrete", concreteScale);
  }

  getIntervalsOfScale(concreteScale: ConcreteScale):Observable<ConcreteInterval[]>{
    return this.http.post<any>(this.uri+"/interval/concrete/scale/tonic", concreteScale);
  }

  getAllConcreteChordsWithConcreteIntervals(concreteInterval: ConcreteInterval):Observable<ConcreteChord[]>{
    return this.http.post<any>(this.uri+"/chord/concrete/interval/concrete", concreteInterval);
  }

  getAllConcreteScalesWithConcreteIntervals(concreteInterval: ConcreteInterval):Observable<ConcreteScale[]>{
    return this.http.post<any>(this.uri+"/scale/concrete/interval/concrete", concreteInterval);
  }

  getConcreteScaleFromConcreteProgression(concreteProgression: ConcreteProgression):Observable<ConcreteScale>{
    return  this.http.post<any>(this.uri+"/scale/concrete/progression/concrete", concreteProgression);
  }

  getConcreteIntervalsOfConcreteChord(concreteChord: ConcreteChord):Observable<ConcreteInterval[]>{
    return  this.http.post<any>(this.uri+"/interval/concrete/chord/concrete", concreteChord);
  }

  getConcreteScalesWithConcreteChord(concreteChord: ConcreteChord):Observable<ConcreteScale[]>{
    return  this.http.post<any>(this.uri+"/scale/concrete/chord/concrete", concreteChord);
  }

  getConcreteProgressionWithTonicProgressionAndScale(concreteProgressionME: ConcreteProgressionME):Observable<ConcreteProgression>{
    return  this.http.post<any>(this.uri+"/progression/concrete/scale/concrete", concreteProgressionME);
  }



  analizeConcreteChord(concreteChordId: number): Observable<ChordAnalized>{
    return this.http.get<ChordAnalized>(this.uri+"/chord/complete/"+concreteChordId);
  }

  analizeConcreteScale(concreteScaleId: number): Observable<ScaleAnalized>{
    return this.http.get<ScaleAnalized>(this.uri+"/scale/complete/"+concreteScaleId);
  }

  analizeConcreteProgression(concreteProgressionId: number): Observable<ProgressionAnalized>{
    return this.http.get<ProgressionAnalized>(this.uri+"/progression/complete/"+concreteProgressionId);
  }

  analizeMe(musicalElementsAnalized:MusicalElementsAnalized): Observable<MusicalElementsResponse>{
    return this.http.post<MusicalElementsResponse>(this.uri+"/me", musicalElementsAnalized);
  }
}
