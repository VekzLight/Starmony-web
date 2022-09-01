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
import { Tag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class RecognizerService {
  private endpoint = 'http://localhost:8080/api/recognizer';


  constructor(private http: HttpClient) { }

}
