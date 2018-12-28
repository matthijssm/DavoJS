import { SheetChord } from "../../model/SheetChord";
import { ChordUtil } from "../../model/utils/ChordUtil";

import { SheetLine } from "../../model/SheetLine";
import { DIRECTIVE_REGEX, DirectiveUtil } from "./DirectiveUtils";
import { Chord } from "../../model/Chord";
import { SheetChordParser } from "./SheetChordParser";

export const SECTION_DATA_REGEX = /.*:$/gm;
export const CHORD_REGEX_GLOBAL = /\[[A-G,a-g][#,b]?[a-z,1-9]{0,4}\/?[A-G,a-g]?[#,b]?\]/g;
export const CHORD_REGEX = /\[[A-G,a-g][#,b]?[a-z,1-9]{0,4}\/?[A-G,a-g]?[#,b]?\]/;

export namespace LineUtils {
    export function containsSectionData(line: string): boolean {
        return !!DirectiveUtil.getSectionDirective(line) || !!line.match(SECTION_DATA_REGEX);
    }

    export function containsDirective(line: string): boolean {
        return !!line.match(DIRECTIVE_REGEX);
    }

    export function parseLine(line: string, key: Chord): SheetLine {
        const cleanedLine = line.replace(CHORD_REGEX_GLOBAL, "");

        const sheetLine = new SheetLine(cleanedLine);

        const sheetChordParser = new SheetChordParser(key);

        sheetLine.chords = parseChordsFromLine(line, 0, sheetChordParser);

        return sheetLine;
    }

    export function parseChordsFromLine(
        line: string,
        startingIndex: number = 0,
        parser: SheetChordParser,
    ): SheetChord[] {
        const chords: SheetChord[] = [];

        // Check if there are any chords in this line
        const chordsInLine = CHORD_REGEX.exec(line);

        if (chordsInLine) {
            const chordModel = ChordUtil.parse(removeBrackets(chordsInLine[0]));

            const chordPosition = startingIndex + chordsInLine.index;

            if (chordModel) {
                const newChord = parser.getSheetChord(chordModel);
                if (newChord) {
                    newChord.position = chordPosition;
                    chords.push(newChord);
                }
            }

            const newString = line.slice(chordsInLine.index + chordsInLine[0].length);

            chords.push(...parseChordsFromLine(newString, chordPosition, parser));
        }

        return chords;
    }

    function removeBrackets(chord: string): string {
        return chord.replace(/\[{0,}\]{0,}/g, "");
    }
}
