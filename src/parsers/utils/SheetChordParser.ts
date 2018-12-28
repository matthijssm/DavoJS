import { Chord } from "../../model/Chord";

import { SheetChord, Quality, Modifier } from "../../model/SheetChord";
import { TheoryData, NashvilleTheory, NashvilleTheoryMap } from "./TheoryData";

type NashvilleInfo = { degree: number; modifier: Modifier };
type NashvilleTuple = [string, NashvilleInfo];

export class SheetChordParser {
    private lastAddedTuple: NashvilleTuple | null = null;

    private chordToNashvilleMap: Map<string, NashvilleInfo> = new Map<string, NashvilleInfo>();

    constructor(baseKey: Chord) {
        this.initializeChordToNashvilleMap(baseKey);
    }

    getSheetChord(chord: Chord): SheetChord | null {
        const nashvilleInfo = this.chordToNashvilleMap.get(chord.chordBaseString);

        const nashvilleBassInfo = chord.bassBase ? this.chordToNashvilleMap.get(chord.bassBaseString)! : undefined;

        if (nashvilleInfo) {
            return new SheetChord(
                nashvilleInfo.degree,
                nashvilleInfo.modifier,
                chord.quality,
                chord.adjectives,
                nashvilleBassInfo ? nashvilleBassInfo.degree : undefined,
                nashvilleBassInfo ? nashvilleBassInfo.modifier : undefined,
            );
        } else {
            return null;
        }
    }

    private initializeChordToNashvilleMap(baseKey: Chord): void {
        const keyList = this.getSortedKeyList(baseKey, TheoryData.KEY_LIST);

        const nashVilleMap =
            baseKey.quality === Quality.MINOR ? TheoryData.MINOR_NASHVILLE : TheoryData.MAJOR_NASHVILLE;

        keyList.forEach((key, index) => {
            if (key.match(/\//g)) {
                // Key string contains two keys that need to be added to the new map.
                const splittedKeys: string[] = key.split("/");

                // Use the order to decide for a # or b adjustment.
                splittedKeys.forEach((splitKey, splitIndex) => {
                    const mode = splitIndex > 0 ? Modifier.FLAT : Modifier.SHARP;

                    const tuple = this.generateChordToNashvilleTuple(splitKey, index, nashVilleMap, mode);

                    this.addTupleToMap(tuple);
                });
            } else {
                // Execute tupel generator once for this key.
                // Use current mode to decide for # or b adjustment.
                const tuple = this.generateChordToNashvilleTuple(key, index, nashVilleMap, this.getMode(baseKey));

                this.addTupleToMap(tuple);
            }
        });
    }

    private addTupleToMap(tuple: NashvilleTuple): void {
        this.chordToNashvilleMap.set(tuple[0], tuple[1]);
        this.lastAddedTuple = tuple;
    }

    private generateChordToNashvilleTuple(
        key: string,
        index: number,
        nashVilleMap: NashvilleTheoryMap,
        mode: Modifier,
    ): NashvilleTuple {
        if (nashVilleMap.has(index)) {
            const theory: NashvilleTheory = nashVilleMap.get(index)!;

            const newTuple: NashvilleTuple = [key, { degree: theory.degree, modifier: Modifier.NONE }];

            return newTuple;
        } else {
            const lastDegree = this.lastAddedTuple ? this.lastAddedTuple[1].degree : 1;

            const degree = mode === Modifier.FLAT ? lastDegree + 1 : lastDegree;

            const newTuple: NashvilleTuple = [key, { degree: degree, modifier: mode }];

            return newTuple;
        }
    }

    private getMode(baseKey: Chord): Modifier {
        if (baseKey.modifier !== Modifier.NONE) {
            return baseKey.modifier;
        }

        if (baseKey.base === "F") {
            return Modifier.FLAT;
        }

        return Modifier.SHARP;
    }

    private getSortedKeyList(key: Chord, keys: string[]): string[] {
        while (!this.compareKeys(keys[0], key)) {
            keys.push(keys.shift()!);
        }

        return keys;
    }
    private compareKeys(keyPair: string, key: Chord) {
        const splittedKeys: string[] = keyPair.split("/");

        const keyString = key.base + key.modifierString;

        return splittedKeys.indexOf(keyString) >= 0 ? true : false;
    }
}
