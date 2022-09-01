import { Location } from '@angular/common';
import {Component, OnInit, ComponentRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { OrderSelectorDirective } from 'src/app/directives/order-selector.directive';
import { AnalyzerService } from 'src/app/services/analyzer.service';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SignalsService } from 'src/app/services/signals.service';
import { OrderSelectElementComponent } from '../order-select-element/order-select-element.component';


@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.scss']
})
export class SeekerComponent implements OnInit {

  overlayActivated: boolean = true;

  // Controles para el autocompletado en la busqueda de elementos musicales
  searchControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  typeFilter: string = 'Basico';

  constructor(
      public signalsService: SignalsService,
      public elementsContainerService: ElementsContainerService,
      private location: Location,
      private router: Router) {

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if( this.elementsContainerService.notes.length == 0 )  this.router.navigate(["/home"]);
  }

  // funcion para el autocompletado
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  

}
