import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Note } from '../interfaces/note.interface';
import { OrderNotes } from '../interfaces/orderNotes.interface';


@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  tabFilter: FormControl = new FormControl();
  tonic: Note;
  
  dominanceME: string = "";

  orderComponents: number = 0;

  guideStep: number = -1;

  typeElementAnalized: string = "";
  relatedAnalized: string = "";

  colors: string[] = [ "#f82d97", "#f82d97", "#01c4e7","#c501e2","#2ef8a0","#ff0534","#e7c500", "#6f3460" ];
  grades: string[] = [ "Primera", "Segunda","Tercera","Cuarta","Quinta","Sexta","Septima","Octava","Novena","Decima", "Onceava", "Doceava", "Treceava" ];
  gradesM: string[] = [ "Primer", "Segundo","Tercer","Cuarto","Quinto","Sexto","Septimo","Octavo","Noveno","Decimo", "Onceavo", "Doceavo", "Treceavo" ];
  gradesI: string[] = [ "I", "II","III","IV","V","VI","VII","VIII", "IX", "X" ];

  constructor() {
    this.relatedAnalized = localStorage.getItem("relatedAnalized") || '{}';
    this.typeElementAnalized = localStorage.getItem("typeElementAnalized") || '{}';
    this.dominanceME = localStorage.getItem("dominanceME") || 'null';
  }

  public ObjectValues(notes: {[key:number]: Note}): Note[]{
    return Object.values(notes);
  }

}
