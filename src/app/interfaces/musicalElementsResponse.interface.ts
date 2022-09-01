export interface MusicalElementsResponse{
    isEmpty: boolean;
    commonChords: {[key: number]: number[]};
    commonIntervals: {[key: number]: number[]};
    commonProgressions: {[key: number]: number[]};
    commonScale: {[key: number]: number[]};
}