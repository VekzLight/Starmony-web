import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConcreteChord } from '../interfaces/concreteChord.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private uri = "http://localhost:8080/api/generator";
  private headers   = new HttpHeaders()
                        .set('content-type', 'application/json')
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Access-Control-Allow-Credentials', 'true');


  constructor(private http: HttpClient) { }

  private getHeader(token: string):HttpHeaders{
    return this.headers.append('authorization', token);
  }

  public predictConcreteChord(ids: number[] ):any{
    return this.http.post<any>(this.uri+"/chord/concrete/ia", ids);
  }
}
