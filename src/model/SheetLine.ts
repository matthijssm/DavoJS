import { Element } from "./Element";
import { SheetChord } from "./SheetChord";

export enum LineType {
	Lyric,
	Comment,
}

export class SheetLine extends Element {
	public chords: SheetChord[] = [];

	constructor(public text: string, readonly lineType: LineType = LineType.Lyric) {
		super();
	}
}
