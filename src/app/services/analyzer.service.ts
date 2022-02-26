import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor(private http: HttpClient) { }

  getIntervarWithSemitone(semitone: number){
    return this.http.get("http://localhost:8080/api/getIntervalWithSemitone/"+semitone);
  }
}
