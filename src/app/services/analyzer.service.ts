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

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {
  private uri = "http://localhost:8080/api/analyzer";

  constructor(private http: HttpClient) { }

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
}
