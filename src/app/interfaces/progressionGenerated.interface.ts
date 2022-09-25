import { ConcreteProgression } from "./concreteProgression.interface";
import { Progression } from "./progression.interface";
import { ProgressionGrade } from "./progressionGrade.interface";
import { Scale } from "./scale.interface";

export interface ProgressionGenerated{
    progression: Progression,
    scales: Scale[],
    progressionGrades: ProgressionGrade[],
    concreteProgressions: ConcreteProgression[],
    saved: boolean
}