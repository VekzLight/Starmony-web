import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderSelectorDirective } from 'src/app/directives/order-selector.directive';
import { Note } from 'src/app/interfaces/note.interface';
import { ElementsContainerService } from 'src/app/services/elements-container.service';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';
import { OrderSelectElementComponent } from '../order-select-element/order-select-element.component';

@Component({
  selector: 'app-config-notes',
  templateUrl: './config-notes.component.html',
  styleUrls: ['./config-notes.component.scss']
})
export class ConfigNotesComponent implements OnInit {

  // Referenciador del ng-Template.
  // dentro se pontran los selectores para el orden de las notas.
  @ViewChild(OrderSelectorDirective, {static: true}) orderAddContainer: OrderSelectorDirective | undefined;

  tonic: Note;
  id: number = 0;

  constructor(
      public seekerResultElements: SeekerResultElementsService,
      public elementsContainerService: ElementsContainerService,
      public signalsService: SignalsService) { }

  ngOnInit(): void {
    
  }


  // Añade elementos de ordenamiento en el servicio signals service
  public addOrder():void{
    const viewContainerRef = this.orderAddContainer?.viewContainerRef;
    const componentRef = viewContainerRef?.createComponent<OrderSelectElementComponent>(OrderSelectElementComponent);

    let _notePosition = { id: this.id, note: {id: -1, name:"", symbol:""}, position: -1 };

    componentRef!.instance.notesSelected = this.elementsContainerService.notesSelected;
    componentRef!.instance.ref = componentRef;
    componentRef!.instance.id = this.id;
    componentRef!.instance.notePosition = _notePosition;

    this.id += 1;
    this.signalsService.orderComponents += 1;

    this.seekerResultElements.orderNotes.push(_notePosition);

    this.seekerResultElements.updateOrder();
  }

}
