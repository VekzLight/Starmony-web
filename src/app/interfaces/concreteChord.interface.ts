import { Chord } from "./chord.interface";
import { Note } from "./note.interface";

export interface ConcreteChord extends Chord{
    id_concrete_chord: number;
    tonic:  Note;
    notes:  Note[];
}

