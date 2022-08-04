import {Component, Input, OnInit, ViewChild, ComponentRef, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'firebase/auth';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { OrderSelectorDirective } from 'src/app/directives/order-selector.directive';
import { SignalsService } from 'src/app/services/signals.service';
import { OrderSelectElementComponent } from '../order-select-element/order-select-element.component';

export class Note{
  id: number = 0;
  symbol: string = "";
}

interface OrderSelect{
  id: number;
  ref: ComponentRef<OrderSelectElementComponent> | undefined;
}

export interface UserData {
  id: string;
  name: string;
  symbol: string;
  notes: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
];


@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit, AfterViewInit {

  displayedColumnsChord: string[] = ['id', 'name', 'symbol', 'notes'];
  dataSourceChord: MatTableDataSource<UserData>;

  displayedColumnsScale: string[] = ['id', 'name', 'symbol', 'notes'];
  dataSourceScale: MatTableDataSource<UserData>;
  
  displayedColumnsProgression: string[] = ['id', 'name', 'symbol', 'notes'];
  dataSourceProgression: MatTableDataSource<UserData>;
  
  displayedColumnsInterval: string[] = ['id', 'name', 'symbol'];
  dataSourceInterval: MatTableDataSource<UserData>;

  selectedChords = new Set<UserData>();
  selectedScales = new Set<UserData>();
  selectedProgressions = new Set<UserData>();
  selectedIntervals = new Set<UserData>();

  @ViewChild(MatPaginator) paginatorChord: MatPaginator = <MatPaginator>{};
  @ViewChild(MatPaginator) paginatorScale: MatPaginator = <MatPaginator>{};
  @ViewChild(MatPaginator) paginatorProgression: MatPaginator = <MatPaginator>{};
  @ViewChild(MatPaginator) paginatorInterval: MatPaginator = <MatPaginator>{};
  @ViewChild(MatSort) sortChord: MatSort = <MatSort>{};
  @ViewChild(MatSort) sortScale: MatSort = <MatSort>{};
  @ViewChild(MatSort) sortProgression: MatSort = <MatSort>{};
  @ViewChild(MatSort) sortInterval: MatSort = <MatSort>{};


  // Referenciador del ng-Template.
  // dentro se pontran los selectores para el orden de las notas.
  @ViewChild(OrderSelectorDirective, {static: true}) orderAddContainer: OrderSelectorDirective | undefined;
  @Input() comp :any;

  // Simbolos de los acordes.
  types: string[] = [];

  // notas
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

  notesSelected: Note[] = [];

  // Controles para el autocompletado en la busqueda de elementos musicales
  searchControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  typeFilter: string = 'Basico';



  resultingChords: any[] = [];
  resultingScales: any[] = [];
  resultingProgressions: any[] = [];
  resultingIntervals: any[] = [];


  constructor(public signalsService: SignalsService) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSourceChord = new MatTableDataSource(users);
    this.dataSourceScale = new MatTableDataSource(users);
    this.dataSourceProgression = new MatTableDataSource(users);
    this.dataSourceInterval = new MatTableDataSource(users);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSourceChord.paginator = this.paginatorChord;
    this.dataSourceChord.sort = this.sortChord;

    this.dataSourceScale.paginator = this.paginatorScale;
    this.dataSourceScale.sort = this.sortScale;

    this.dataSourceProgression.paginator = this.paginatorProgression;
    this.dataSourceProgression.sort = this.sortProgression;

    this.dataSourceInterval.paginator = this.paginatorInterval;
    this.dataSourceInterval.sort = this.sortInterval;
  }

  applyFilterChord(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceChord.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceChord.paginator) {
      this.dataSourceChord.paginator.firstPage();
    }
  }
  applyFilterScale(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceScale.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceScale.paginator) {
      this.dataSourceScale.paginator.firstPage();
    }
  }

  applyFilterProgression(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProgression.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceProgression.paginator) {
      this.dataSourceProgression.paginator.firstPage();
    }
  }
  
  applyFilterInterval(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceInterval.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceInterval.paginator) {
      this.dataSourceInterval.paginator.firstPage();
    }
  }
  
  public createNewUser(id: number): UserData {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';
  
    return {
      id: id.toString(),
      name: name,
      symbol: Math.round(Math.random() * 100).toString(),
      notes: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    };
  }
  
  // funcion para el autocompletado
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Swich para el cambio de controles
  public changeType():void{
    if(this.typeFilter == 'Basico') this.typeFilter = 'Avanzado';
    else this.typeFilter = 'Basico';
  }


  // Selecciona una nota musical o la quita
  public selectNote(note: Note):void{
    if( !this.notesSelected.includes(note) ){
      this.notesSelected.push(note);
    } else {
      this.notesSelected.forEach((element,index)=>{
        if(element.id==note.id)this.notesSelected.splice(index,1); 
      });
    }
  }


  // Añade elementos de ordenamiento en el servicio signals service
  public addOrder():void{
    const viewContainerRef = this.orderAddContainer?.viewContainerRef;
    const componentRef = viewContainerRef?.createComponent<OrderSelectElementComponent>(OrderSelectElementComponent);

    componentRef!.instance.notesSelected = this.notesSelected;
    componentRef!.instance.ref = componentRef;

    this.signalsService.orderComponents += 1;
  }

  public selectChord(chord: UserData):void{
    if(this.selectedChords.has(chord)) this.selectedChords.delete(chord);
    else this.selectedChords.add(chord);
  }
  public selectScales(scale: UserData):void{
    if(this.selectedScales.has(scale)) this.selectedScales.delete(scale);
    else this.selectedScales.add(scale);
  }
  public selectProgressions(progression: UserData):void{
    if(this.selectedProgressions.has(progression)) this.selectedProgressions.delete(progression);
    else this.selectedProgressions.add(progression);
  }
  public selectIntervals(interval: UserData):void{
    if(this.selectedIntervals.has(interval)) this.selectedIntervals.delete(interval);
    else this.selectedIntervals.add(interval);
  }

}
