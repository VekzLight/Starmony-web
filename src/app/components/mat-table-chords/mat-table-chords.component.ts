import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chord } from 'src/app/interfaces/chord.interface';
import { RecognizerService } from 'src/app/services/recognizer.service';

@Component({
  selector: 'app-mat-table-chords',
  templateUrl: './mat-table-chords.component.html',
  styleUrls: ['./mat-table-chords.component.scss']
})
export class MatTableChordsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'symbol', 'code'];
  chords:Chord[] = [];
  chordsSelected:number[] = [];

  constructor(
    public recognizerService: RecognizerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getChords();
  }

  private getChords():void{
    this.recognizerService.getAllChords().subscribe((resp: any)=>{
      this.chords = resp;
      console.log(this.chords);
    });
  }

  public selectChord(id:number):void{
    if(!this.isSelectedChord(id)){
      this.chordsSelected.push(id);
    } else {
      this.removeChord(id);
    }
    console.log(this.chordsSelected);
  }

  private removeChord(id:number):void{
    this.chordsSelected.forEach((element,index)=>{
      if(element==id) this.chordsSelected.splice(index,1);
    });
  }

  public isSelectedChord(id: number):boolean{
    return this.chordsSelected.includes(id);
  }

}
