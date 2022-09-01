import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorLoaderService implements HttpInterceptor{

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean >(false);

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    this.isLoading.next(true);

    return next.handle(req).pipe(
      finalize( () => { this.isLoading.next(false) })
    );
  }
}
