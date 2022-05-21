import { ConcreteChord } from "./concreteChord.interface";
import { ScaleGrade } from "./scaleGrade.interface";

export interface ConcreteGradeScales extends ScaleGrade{
    idConcreteScaleGrade:   number;
    concreteGrades:         ConcreteChord[];
}
