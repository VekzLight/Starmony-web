import { Interval } from "./interval.interface";
import { Note } from "./note.interface";

export interface ConcreteInterval extends Interval{
    id_concrete_interval: number;
    firstNote:  Note;
    lastNote:  Note;
}
