import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chord } from 'src/app/interfaces/chord.interface';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { Note } from 'src/app/interfaces/note.interface';
import { RecognizerService } from 'src/app/services/recognizer.service';

@Component({
  selector: 'app-recognizer',
  templateUrl: './recognizer.component.html',
  styleUrls: ['./recognizer.component.scss']
})
export class RecognizerComponent implements OnInit {

  displayedColumns: string[] = ['name', 'symbol', 'semitones'];

  chords:Chord[] = [];
  concretechords:ConcreteChord[] = [];

  notes:Note[] = [];
  notesSelected: number[] = [];

  searched:String = "";

  constructor(
    public recognizerService: RecognizerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getNotes();
  
  }

  private getNotes(): void{
    this.recognizerService.getAllNotes().subscribe((resp: any)=>{
      this.notes = resp;
      console.log(this.notes);
    });
  }

  public selectNote(id: number):void{
    if(!this.isSelectedNote(id)){
      this.notesSelected.push(id);
    } else {
      this.removeNote(id);
    }
    console.log(this.notesSelected);
  }

  private removeNote(id: number):void{
    this.notesSelected.forEach((element,index)=>{
      if(element==id) this.notesSelected.splice(index,1); 
    });
  }

  public isSelectedNote(id: number):boolean{
    return this.notesSelected.includes(id);
  }

  public selectSearched(searched: string):void{
    this.searched=searched;
  } 

  public isSelectedSearched(searched: string):boolean{
    return this.searched==searched;
  }
}
