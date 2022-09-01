export interface ChordAnalized {
    exist: boolean;
    concreteScalesIds:       { [key: string]: number };
    concreteProgressionsIds: { [key: string]: number[] };
    concreteIntervalsIds:    number[];
}
