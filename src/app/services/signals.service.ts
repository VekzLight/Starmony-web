import { Injectable } from '@angular/core';
import { Note } from '../components/seeker/seeker.component';

interface OrderNotes{
  note: Note,
  position: number
}

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  orderNotes: Array<OrderNotes> = [];
  orderComponents: number = 0;

  constructor() { }

}
