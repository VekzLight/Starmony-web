import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcreteChord } from 'src/app/interfaces/concreteChord.interface';
import { RecognizerService } from 'src/app/services/recognizer.service';

@Component({
  selector: 'app-mat-table-concrete-chords',
  templateUrl: './mat-table-concrete-chords.component.html',
  styleUrls: ['./mat-table-concrete-chords.component.scss']
})
export class MatTableConcreteChordsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'tonic', 'notes'];

  concreteChords: ConcreteChord[] = [];
  concreteChordsSelected: number[] = [];

  constructor(
    public recognizerService: RecognizerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getConcreteChords();
  }

  
  private getConcreteChords():void{
    this.recognizerService.getAllConcreteChords().subscribe((resp: any)=>{
      this.concreteChords = resp;
      console.log(this.concreteChords);
    });
  }

  public selectConcreteChord(id:number):void{
    if(!this.isSelectedConcreteChord(id)){
      this.concreteChordsSelected.push(id);
    } else {
      this.removeConcreteChord(id);
    }
    console.log(this.concreteChordsSelected);
  }

  private removeConcreteChord(id:number):void{
    this.concreteChordsSelected.forEach((element,index)=>{
      if(element==id) this.concreteChordsSelected.splice(index,1);
    });
  }

  public isSelectedConcreteChord(id: number):boolean{
    return this.concreteChordsSelected.includes(id);
  }

}
