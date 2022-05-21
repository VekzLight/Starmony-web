import { Chord } from "./chord.interface";
import { Progression } from "./progression.interface";
import { Scale } from "./scale.interface";

export interface ProgressionGrade extends Progression{
    scale:                Scale;
    id_progression_grade: number;
    grades:               { [key: string]: Chord };
}
