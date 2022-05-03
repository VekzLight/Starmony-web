import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interval } from 'src/app/interfaces/interval.interface';
import { RecognizerService } from 'src/app/services/recognizer.service';

@Component({
  selector: 'app-mat-table-interval',
  templateUrl: './mat-table-interval.component.html',
  styleUrls: ['./mat-table-interval.component.scss']
})
export class MatTableIntervalComponent implements OnInit {

  displayedColumns: string[] = ['name', 'symbol', 'semitones'];

  intervals:Interval[] = [];
  intervalsSelected:number[] =[];

  constructor(
    public recognizerService: RecognizerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getIntervals();
  }

  private getIntervals():void{
    this.recognizerService.getAllIntervals().subscribe((resp: any)=>{
      this.intervals = resp;
      console.log(this.intervals);
    });
  }

  public selectInterval(id:number):void{
    if(!this.isSelectedInterval(id)){
      this.intervalsSelected.push(id);
    } else {
      this.removeInterval(id);
    }
    console.log(this.intervalsSelected);
  }

  private removeInterval(id:number):void{
    this.intervalsSelected.forEach((element,index)=>{
      if(element==id) this.intervalsSelected.splice(index,1);
    });
  }

  public isSelectedInterval(id: number):boolean{
    return this.intervalsSelected.includes(id);
  }
}
