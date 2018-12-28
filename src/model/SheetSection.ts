import { AbstractElement } from "./AbstractElement";
import { IElementHolder } from "./IElementHolder";
import { SheetLine } from "./SheetLine";

export type SheetSectionType = "Verse" | "Chorus";

export class SheetSection extends AbstractElement implements IElementHolder {
    readonly elements: AbstractElement[] = [];
    readonly lines: SheetLine[] = [];

    constructor(public type: SheetSectionType = "Verse", public label: string = "") {
        super();
    }
}
