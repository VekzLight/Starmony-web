import { Chord } from "./chord.interface";
import { FilterNote } from "./filterNotes.interface";
import { Note } from "./note.interface";
import { OrderNotes } from "./orderNotes.interface";

export interface FilterChord extends FilterNote{
    chordType:  Chord,
    adders:     number,
    state:      string
}