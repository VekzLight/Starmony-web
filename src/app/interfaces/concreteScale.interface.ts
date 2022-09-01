import { Note } from "./note.interface";
import { Scale } from "./scale.interface";

export interface ConcreteScale extends Scale{
    id_concrete_scale: number;
    tonic:      Note;
    notes:      { [key: string]: Note };
}
