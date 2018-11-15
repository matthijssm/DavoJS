import uuid = require("uuid");
import { Element } from "./Element";
import { IElementHolder } from "./IElementHolder";
import { ISheetMetaData } from "./ISheetMetaData";
import { SheetSection } from "./SheetSection";

export class SheetModel implements IElementHolder {
	public readonly ID: string;

	public readonly elements: Element[] = [];
	public sections: SheetSection[] = [];

	constructor(readonly metadata: ISheetMetaData) {
		this.ID = uuid.v4();
	}

	public addSection(section: SheetSection) {
		this.sections.push(section);
	}

	public addSections(sections: SheetSection[]) {
		this.sections = this.sections.concat(sections);
	}
}
