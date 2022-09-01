import { FilterNote } from "./filterNotes.interface";
import { Note } from "./note.interface";
import { ScaleGrade } from "./scaleGrade.interface";

export interface FilterScale extends FilterNote{
    groupIds:   number[],
    code:       string,
    direction:  boolean,
    scalesIds:  number[]
}