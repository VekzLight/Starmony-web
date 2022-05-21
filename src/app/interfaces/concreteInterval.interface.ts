import { Interval } from "./interval.interface";
import { Note } from "./note.interface";

export interface ConcreteInterval extends Interval{
    id_concrete_interval: number;
    firsNote:  Note;
    lastNote:  Note;
}
