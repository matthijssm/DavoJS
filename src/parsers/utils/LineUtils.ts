import { SheetChord } from "../../model/SheetChord";
import { ChordUtil } from "../../model/utils/ChordUtil";

import { SheetLine } from "../../model/SheetLine";
import { DIRECTIVE_REGEX, DirectiveUtil } from "./DirectiveUtils";

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

	export function parseLine(line: string): SheetLine {
		const cleanedLine = line.replace(CHORD_REGEX_GLOBAL, "");

		const sheetLine = new SheetLine(cleanedLine);

		sheetLine.chords = getChords(line);

		return sheetLine;
	}

	export function getChords(line: string, startingIndex: number = 0): SheetChord[] {
		const chords: SheetChord[] = [];

		const match = CHORD_REGEX.exec(line);

		if (match) {
			const newChord = ChordUtil.parse(removeBrackets(match[0]));

			const chordPosition = startingIndex + match.index;

			if (newChord) {
				newChord.position = chordPosition;
				chords.push(newChord);
			}

			const newString = line.slice(match.index + match[0].length);

			chords.push(...getChords(newString, chordPosition));
		}

		return chords;
	}

	function removeBrackets(chord: string): string {
		return chord.replace("[", "").replace("]", "");
	}
}
