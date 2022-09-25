import { Chord } from "./chord.interface";
import { FilterNote } from "./filterNotes.interface";

export interface FilterProgression extends FilterNote{
    cadence:  string[],
    nChords:  number,
    code:     string,
    beginChord: Chord,
    endChord:   Chord,
    genere: number[],
}