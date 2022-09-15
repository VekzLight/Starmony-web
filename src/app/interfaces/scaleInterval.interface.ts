import { Interval } from "./interval.interface";
import { Scale } from "./scale.interface";

export interface ScaleInterval {
    id:              number;
    scaleOfInterval: Scale;
    intervalOfScale: Interval;
}