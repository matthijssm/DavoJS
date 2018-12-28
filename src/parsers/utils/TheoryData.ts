import { Quality } from "../../model/SheetChord";

export type NashvilleTheory = {
    defaultQuality: Quality;
    degree: number;
};

export type NashvilleTheoryMap = Map<number, NashvilleTheory>;

export namespace TheoryData {
    export const KEY_LIST = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];

    export const MAJOR_NASHVILLE: NashvilleTheoryMap = new Map([
        [0, { defaultQuality: Quality.MAJOR, degree: 1 }],
        [2, { defaultQuality: Quality.MINOR, degree: 2 }],
        [4, { defaultQuality: Quality.MINOR, degree: 3 }],
        [5, { defaultQuality: Quality.MAJOR, degree: 4 }],
        [7, { defaultQuality: Quality.MAJOR, degree: 5 }],
        [9, { defaultQuality: Quality.MINOR, degree: 6 }],
        [11, { defaultQuality: Quality.DIMINISHED, degree: 7 }],
    ]);

    export const MINOR_NASHVILLE: NashvilleTheoryMap = new Map([
        [0, { defaultQuality: Quality.MINOR, degree: 1 }],
        [1, { defaultQuality: Quality.DIMINISHED, degree: 2 }],
        [3, { defaultQuality: Quality.MAJOR, degree: 3 }],
        [5, { defaultQuality: Quality.MINOR, degree: 4 }],
        [6, { defaultQuality: Quality.MINOR, degree: 5 }],
        [8, { defaultQuality: Quality.MAJOR, degree: 6 }],
        [10, { defaultQuality: Quality.DIMINISHED, degree: 7 }],
    ]);
}
