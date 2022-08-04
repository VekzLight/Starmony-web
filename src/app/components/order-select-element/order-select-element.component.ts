import { Component, ComponentRef, Input, OnInit} from '@angular/core';
import { SignalsService } from 'src/app/services/signals.service';
import { Note } from '../seeker/seeker.component';

@Component({
  selector: 'app-order-select-element',
  templateUrl: './order-select-element.component.html',
  styleUrls: ['./order-select-element.component.scss']
})
export class OrderSelectElementComponent implements OnInit {

  @Input() notesSelected: Note[] = [];

  ref ?: ComponentRef<OrderSelectElementComponent>;
  destroyFlag: boolean = false;

  constructor(public signalsService: SignalsService) {}

  ngOnInit(): void {
  }

  public destroySelf():void{
    this.destroyFlag = true;
    this.signalsService.orderComponents -= 1;
    this.ref?.destroy;
  }

}
