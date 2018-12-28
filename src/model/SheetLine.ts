import { AbstractElement } from "./AbstractElement";
import { SheetChord } from "./SheetChord";

export enum LineType {
    Lyric,
    Comment,
}

export class SheetLine extends AbstractElement {
    chords: SheetChord[] = [];

    constructor(public text: string, readonly lineType: LineType = LineType.Lyric) {
        super();
    }
}
