import { Chord } from "./chord.interface";
import { Scale } from "./scale.interface";

export interface ScaleGrade extends Scale{
    idScaleGrade: number;
    grades: Chord[]; 
}
