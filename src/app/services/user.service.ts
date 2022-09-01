import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { ConcreteInterval } from '../interfaces/concreteInterval.interface';
import { ConcreteChord } from '../interfaces/concreteChord.interface';
import { ConcreteScale } from '../interfaces/concreteScale.interface';
import { ConcreteProgression } from '../interfaces/concreteProgression.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint  = 'http://localhost:8080/api/user';
  private headers   = new HttpHeaders()
                        .set('content-type', 'application/json')
                        .set('Access-Control-Allow-Origin', '*')
                        .set('Access-Control-Allow-Credentials', 'true');


  constructor(private http: HttpClient) { }

  private getHeader(token: string):HttpHeaders{
    return this.headers.append('authorization', token);
  }

  public login(user: User):any{
    return this.http.post<any>(this.endpoint+"/login", user);
  }

  public register(user: User):any{
    return this.http.post<any>(this.endpoint+"/register", user);
  }

  public getSession(token: String):any{
    return this.http.post<any>(this.endpoint+"/session", token);  
  }



  public addInterval(id: number):any{
    return this.http.post<any>(this.endpoint+"/interval", id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public removeInterval(id: number):any{
    return this.http.delete(this.endpoint + "/interval/" + id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }


  public addChord(id: number):any{
    return this.http.post<any>(this.endpoint+"/chord", id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public removeChord(id: number):any{
    return this.http.delete(this.endpoint + "/chord/" + id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }



  public addScale(id: number):any{
    return this.http.post<any>(this.endpoint+"/scale", id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public removeScale(id: number):any{
    return this.http.delete(this.endpoint + "/scale/" + id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }



  public addProgression(id: number):any{
    return this.http.post<any>(this.endpoint+"/progression", id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public removeProgression(id: number):any{
    return this.http.delete(this.endpoint + "/progression/" + id, { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  

  public getAllConcreteIntervals():Observable<ConcreteInterval[]>{
    return this.http.get<ConcreteInterval[]>(this.endpoint + "/interval", { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public getAllConcreteChords():Observable<ConcreteChord[]>{
    return this.http.get<ConcreteChord[]>(this.endpoint + "/chord", { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public getAllConcreteScales():Observable<ConcreteScale[]>{
    return this.http.get<ConcreteScale[]>(this.endpoint + "/scale", { headers: this.getHeader(localStorage.getItem('token') as string) });
  }

  public getAllConcreteProgressions():Observable<ConcreteProgression[]>{
    return this.http.get<ConcreteProgression[]>(this.endpoint + "/progression", { headers: this.getHeader(localStorage.getItem('token') as string) });
  }
}
