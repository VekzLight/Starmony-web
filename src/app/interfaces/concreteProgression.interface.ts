import { ConcreteChord } from "./concreteChord.interface";
import { ProgressionGrade } from "./progressionGrade.interface";

export interface ConcreteProgression extends ProgressionGrade{
    id_concrete_progression: number;
    id_concrete_scale: number;
    concreteGrades:          { [key: string]: ConcreteChord };
}
