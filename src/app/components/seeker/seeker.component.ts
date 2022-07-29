import {Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export class Note{
  id: number = 0;
  symbol: string = "";
}

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit  {

  @ViewChild('orderAddContainer') orderAddContainer:ElementRef = {} as ElementRef;


  notes: Note[] = [
    {id: 0, symbol:"C"},
    {id: 1, symbol:"C#"},
    {id: 2, symbol:"D"},
    {id: 3, symbol:"D#"},
    {id: 4, symbol:"E"},
    {id: 5, symbol:"F"},
    {id: 6, symbol:"F#"},
    {id: 7, symbol:"G"},
    {id: 8, symbol:"G#"},
    {id: 9, symbol:"A"},
    {id: 10, symbol:"A#"},
    {id: 11, symbol:"B"},
  ];

  tonic: number = 0;
  notesSelected: Note[] = [];

  searchControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  typeFilter: string = 'Basico';

  constructor(private renderer:Renderer2) { 
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  ngOnInit(): void {

  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public changeType():void{
    if(this.typeFilter == 'Basico') this.typeFilter = 'Avanzado';
    else this.typeFilter = 'Basico';
  }

  public selectNote(note: Note):void{
    if( !this.notesSelected.includes(note) ){
      this.notesSelected.push(note);
    } else {
      this.notesSelected.forEach((element,index)=>{
        if(element.id==note.id)this.notesSelected.splice(index,1); 
      });
    }
  }

  public addOrder():void{
    const matFormField = this.renderer.createElement('mat-form-field');
    this.renderer.setAttribute(matFormField, 'appearance', 'fill');

    const matLabel = this.renderer.createElement('mat-label');
    const matLabelText = this.renderer.createText('Tonica');
    this.renderer.appendChild(matLabel, matLabelText);

    const matSelect = this.renderer.createElement('mat-select');
    const matOpcion = this.renderer.createElement('mat-option');
    this.renderer.setProperty(matOpcion, '*ngFor', 'let note of notesSelected');
    this.renderer.setProperty(matOpcion, '[value]', 'note.id');

    //const matDirective = this.renderer.createText('{{note.symbol}}');
    //this.renderer.appendChild(matOpcion, matDirective);
    this.renderer.appendChild(matSelect, matOpcion);
    this.renderer.appendChild(matFormField, matLabel);
    this.renderer.appendChild(matFormField, matSelect);

    this.renderer.appendChild(this.orderAddContainer.nativeElement, matFormField);
  }
}
