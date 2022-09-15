import { ConcreteGradeScales } from "./concreteGradeScales.interface";
import { ConcreteProgression } from "./concreteProgression.interface";
import { ConcreteScale } from "./concreteScale.interface";
import { ProgressionGrade } from "./progressionGrade.interface";
import { Scale } from "./scale.interface";
import { ScaleGrade } from "./scaleGrade.interface";
import { ScaleInterval } from "./scaleInterval.interface";

export interface ScaleGenerated {
    scale:                Scale;
    concreteScales:       { [key: string]: ConcreteScale };
    scaleIntervals:       ScaleInterval[];
    scaleGrades:          { [key: string]: ScaleGrade };
    concreteScaleGrades:  { [key: string]: ConcreteGradeScales };
    progressionGrades:    { [key: string]: ProgressionGrade };
    concreteProgressions: { [key: string]: ConcreteProgression };
}