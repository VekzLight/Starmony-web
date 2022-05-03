import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable  } from 'rxjs';
import { Note } from '../interfaces/note.interface';
import { Interval } from '../interfaces/interval.interface';
import { Chord } from '../interfaces/chord.interface';
import { ConcreteChord } from '../interfaces/concreteChord.interface';

@Injectable({
  providedIn: 'root'
})
export class RecognizerService {
  private endpoint = 'http://localhost:8080/api/recognizer';


  constructor(private http: HttpClient) { }

  public getAllNotes():Observable<any>{
    return this.http.get<Note>(this.endpoint+"/notes");
  }

  public getAllIntervals():Observable<any>{
    return this.http.get<Interval>(this.endpoint+"/intervals");
  }

  public getAllChords():Observable<any>{
    return this.http.get<Chord>(this.endpoint+"/chords");
  }

  public getAllConcreteChords():Observable<any>{
    return this.http.get<ConcreteChord>(this.endpoint+"/chords/concrete");
  }

}
