import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable  } from 'rxjs';
import { Note } from '../interfaces/note.interface';
import { Interval } from '../interfaces/interval.interface';
import { Chord } from '../interfaces/chord.interface';
import { ConcreteChord } from '../interfaces/concreteChord.interface';
import { Scale } from '../interfaces/scale.interface';
import { ConcreteInterval } from '../interfaces/concreteInterval.interface';
import { Progression } from '../interfaces/progression.interface';
import { ConcreteScale } from '../interfaces/concreteScale.interface';

@Injectable({
  providedIn: 'root'
})
export class RecognizerService {
  private endpoint = 'http://localhost:8080/api/recognizer';


  constructor(private http: HttpClient) { }

  public getAllNotes():Observable<any>{
    return this.http.get<Note>(this.endpoint+"/note");
  }

  public getAllIntervals():Observable<any>{
    return this.http.get<Interval>(this.endpoint+"/interval");
  }

  public getAllChords():Observable<any>{
    return this.http.get<Chord>(this.endpoint+"/chord");
  }

  public getAllScales():Observable<any>{
    return this.http.get<Scale>(this.endpoint+"/scale");
  }

  public getAllProgressions():Observable<any>{
    return this.http.get<Progression>(this.endpoint+"/progression");
  }

  public getAllConcreteChords():Observable<any>{
    return this.http.get<ConcreteChord>(this.endpoint+"/chord/concrete");
  }

  public getConcreteIntervalWithNotes(firstNote: number, lastNote: number):Observable<any>{
    return this.http.get<ConcreteInterval>(this.endpoint+"/interval/concrete/i");
  }

  public getConcreteScaleByIdAndTonic(scale: Scale, tonic: Note):Observable<ConcreteScale>{
    return this.http.get<ConcreteScale>(this.endpoint+"/scale/concrete/s/"+scale.id+"/t/"+tonic.id);
  }

  public getScaleById(id: number):Observable<Scale>{
    return this.http.get<Scale>(this.endpoint+"/scale/"+id);
  }

  public getProgressionById(id: number):Observable<Progression>{
    return this.http.get<Progression>(this.endpoint+"/progression/"+id);
  }

}
