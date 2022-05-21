import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progression } from '../interfaces/progression.interface';
import { Scale } from '../interfaces/scale.interface';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  private uri = "http://localhost:8080/api/creator";

  constructor(private http: HttpClient) { }

  public createScale(scale: Scale):any{
    return this.http.post<any>(this.uri+"/scale",scale);
  }

  public createProgression(progression: Progression):any{
    return this.http.post<any>(this.uri+"/progression",progression);
  }
}
