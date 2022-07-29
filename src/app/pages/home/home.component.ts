import { Component, OnInit, OnDestroy, Output, EventEmitter, Input  } from '@angular/core';
import { MenuPositionX } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public username: String = localStorage.getItem("username") as string;

  constructor(private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if( localStorage.getItem('token') == null )
    this.router.navigate(["/login"]);
  }

  public cerrarSession():void{
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.router.navigate(["/login"]);
  }

  public to(component: string):boolean{
    this.router.navigate([component]);
    return false;
  }

  public changeUser():void{
    location.reload();
  }
}
