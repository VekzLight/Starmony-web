import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public username: String = localStorage.getItem("username") as string;

  constructor(
      private router:Router,
      public elementsContainerService: ElementsContainerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if( localStorage.getItem('token') == null ) this.router.navigate(['login', 'inicio']);
  }

  public cerrarSession():void{
    window.localStorage.clear();
    this.router.navigate(['login', 'inicio']);
  }

  public changeUser():void{
    location.reload();
  }
}
