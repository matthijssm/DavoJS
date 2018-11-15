import { Element } from "./Element";
import { IElementHolder } from "./IElementHolder";

export type SheetSectionType = "Verse" | "Chorus";

export class SheetSection extends Element implements IElementHolder {
	public readonly elements: Element[] = [];
	public readonly line: [] = [];

	constructor(public type: SheetSectionType = "Verse", public label: string = "") {
		super();
	}
}
