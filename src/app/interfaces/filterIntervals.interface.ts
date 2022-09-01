import { FilterNote } from "./filterNotes.interface";

export interface FilterInterval extends FilterNote{
    semitones:  number,
    type:       number,
    direction:  number
}