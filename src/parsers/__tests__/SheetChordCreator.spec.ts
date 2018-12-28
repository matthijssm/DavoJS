import { SheetChordParser } from "../utils/SheetChordParser";
import { ChordUtil } from "../../model/utils/ChordUtil";

describe("SheetChordParser should parse valid SheetChords", () => {
    it("should generate valid SheetChords for the key of C", () => {
        assertNashvilleChordInKey("C", "C", "1");
        assertNashvilleChordInKey("C", "Dm", "2-");
        assertNashvilleChordInKey("C", "Em", "3-");
        assertNashvilleChordInKey("C", "F", "4");
        assertNashvilleChordInKey("C", "G", "5");
        assertNashvilleChordInKey("C", "Am", "6-");
        assertNashvilleChordInKey("C", "Bdim", "7°");
        assertNashvilleChordInKey("C", "C#", "1#");
        assertNashvilleChordInKey("C", "Db", "2b");
    });

    it("should generate valid SheetChords for the key of F", () => {
        assertNashvilleChordInKey("F", "F", "1");
        assertNashvilleChordInKey("F", "Gm", "2-");
        assertNashvilleChordInKey("F", "Am", "3-");
        assertNashvilleChordInKey("F", "A#", "4");
        assertNashvilleChordInKey("F", "Bb", "4");
        assertNashvilleChordInKey("F", "B", "5b");
        assertNashvilleChordInKey("F", "C", "5");
        assertNashvilleChordInKey("F", "Dm", "6-");
        assertNashvilleChordInKey("F", "Edim", "7°");
        assertNashvilleChordInKey("F", "F#", "1#");
        assertNashvilleChordInKey("F", "Dbm", "6b-");
    });

    it("should generate valid SheetChords for the key of B ", () => {
        assertNashvilleChordInKey("B", "B", "1");
        assertNashvilleChordInKey("B", "C#m", "2-");
        assertNashvilleChordInKey("B", "Dbm", "2-");
        assertNashvilleChordInKey("B", "D#m", "3-");
        assertNashvilleChordInKey("B", "Ebm", "3-");
        assertNashvilleChordInKey("B", "Eb", "3");
        assertNashvilleChordInKey("B", "E", "4");
        assertNashvilleChordInKey("B", "F#", "5");
        assertNashvilleChordInKey("B", "Gb", "5");
        assertNashvilleChordInKey("B", "G#m", "6-");
        assertNashvilleChordInKey("B", "A#dim", "7°");
    });

    it("should generate valid SheetChords with bass chords in the key of D ", () => {
        assertNashvilleChordInKey("D", "D", "1");
        assertNashvilleChordInKey("D", "Em/D", "2-/1");
        assertNashvilleChordInKey("D", "Em/D#", "2-/1#");
        assertNashvilleChordInKey("D", "Emsus4/F", "2-sus4/2#");
    });

    it("should generate valid SheetChords with adjectives in the key of E ", () => {
        assertNashvilleChordInKey("E", "E", "1");
        assertNashvilleChordInKey("E", "Etest", "1test");
        assertNashvilleChordInKey("E", "Edimsus4", "1°sus4");
        assertNashvilleChordInKey("E", "Eaugdimadd5", "1+dimadd5");
    });

    function assertNashvilleChordInKey(key: string, chord: string, result: string): void {
        const parser = generateParser(key);
        const parsedChord = ChordUtil.parse(chord);

        const sheetChord = parser.getSheetChord(parsedChord!);

        expect(sheetChord.toString()).toBe(result);
    }

    function generateParser(chord: string): SheetChordParser {
        const baseKey = ChordUtil.parse(chord);

        return new SheetChordParser(baseKey!);
    }
});
