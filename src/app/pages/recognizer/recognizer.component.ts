import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';


@Component({
  selector: 'app-recognizer',
  templateUrl: './recognizer.component.html',
  styleUrls: ['./recognizer.component.scss']
})
export class RecognizerComponent implements OnInit {

  chords:Chord[] = [];
  concretechords:ConcreteChord[] = [];

  searched:String = localStorage.getItem("page") as string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  public selectSearched(searched: string):void{
    localStorage.setItem("page", searched);
    console.log(this.searched)
  } 

  public isSelectedSearched(searched: string):boolean{
    return this.searched==searched;
  }


  public returnPage():void{
    localStorage.setItem("page", "home");
  }
}
