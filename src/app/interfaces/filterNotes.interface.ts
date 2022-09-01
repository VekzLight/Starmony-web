import { Note } from "./note.interface";
import { OrderNotes } from "./orderNotes.interface";

export interface FilterNote{
    name:       string,
    min:        number,
    max:        number,
    notes:      Note[],
    tonic:      Note,
    order:      OrderNotes[]
}