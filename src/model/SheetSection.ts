import { Element } from "./Element";
import { IElementHolder } from "./IElementHolder";
import { SheetLine } from "./SheetLine";

export type SheetSectionType = "Verse" | "Chorus";

export class SheetSection extends Element implements IElementHolder {
	public readonly elements: Element[] = [];
	public readonly lines: SheetLine[] = [];

	constructor(public type: SheetSectionType = "Verse", public label: string = "") {
		super();
	}
}
