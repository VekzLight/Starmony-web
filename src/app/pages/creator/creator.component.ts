import { Component, OnInit } from '@angular/core';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  chords:Chord[] = [];
  concretechords:ConcreteChord[] = [];

  searched:String = "";

  constructor() { }

  ngOnInit(): void {
    
  }

  public selectSearched(searched: string):void{
    this.searched=searched;
    console.log(this.searched)
  } 

  public isSelectedSearched(searched: string):boolean{
    return this.searched==searched;
  }
}
