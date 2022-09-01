import { Component, ComponentRef, Input, OnInit} from '@angular/core';
import { OrderNotes } from 'src/app/interfaces/orderNotes.interface';
import { SeekerResultElementsService } from 'src/app/services/seeker-result-elements.service';
import { SignalsService } from 'src/app/services/signals.service';
import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-order-select-element',
  templateUrl: './order-select-element.component.html',
  styleUrls: ['./order-select-element.component.scss']
})
export class OrderSelectElementComponent implements OnInit {

  @Input() notesSelected ?: Note[];
  @Input() notePosition ?: OrderNotes;
  @Input() ref ?: ComponentRef<OrderSelectElementComponent>;
  @Input() id ?: number;

  destroyFlag: boolean = false;

  position: number = -1;
  note: Note = {id:-1, name:"", symbol:""};

  constructor(
    public seekerResultElementsService:SeekerResultElementsService,
    public signalsService: SignalsService) {
    }

  ngOnInit(): void {
  }

  public destroySelf():void{
    this.seekerResultElementsService.orderNotes.forEach( (element, index)=>{
      if(element.id == this.id){
        this.seekerResultElementsService.orderNotes.splice(index, 1);

        this.seekerResultElementsService.updateOrder();
      }
    });
    this.destroyFlag = true;
    this.signalsService.orderComponents -= 1;
    this.ref?.destroy;
  }

  public selectPosition(position: number):void{
    if(this.position != -1 && this.note.id != -1){
      this.notePosition!.note = this.note;
      this.notePosition!.position = this.position;

      let _index = this.seekerResultElementsService.orderNotes.findIndex( _order => _order.id == this.id );
      this.seekerResultElementsService.orderNotes[_index] != this.notePosition;

      this.seekerResultElementsService.updateOrder();
    }
  }
}
