import { Chord } from "./chord.interface";
import { Note } from "./note.interface";

export interface ConcreteChord extends Chord{
    tonic:  Note;
    notes:  Note[];
}