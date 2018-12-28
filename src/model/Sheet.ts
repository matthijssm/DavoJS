import uuid = require("uuid");
import { AbstractElement } from "./AbstractElement";
import { IElementHolder } from "./IElementHolder";
import { ISheetMetaData } from "./ISheetMetaData";
import { SheetSection } from "./SheetSection";

export class Sheet implements IElementHolder {
    readonly ID: string;

    readonly elements: AbstractElement[] = [];
    sections: SheetSection[] = [];

    constructor(readonly metadata: ISheetMetaData) {
        this.ID = uuid.v4();
    }

    addSection(section: SheetSection) {
        this.sections.push(section);
    }

    addSections(sections: SheetSection[]) {
        this.sections = this.sections.concat(sections);
    }

    getSection(id: string) {
        return this.sections.find(section => section.ID === id);
    }

    deleteSection(id: string) {
        this.sections = this.sections.filter(section => section.ID !== id);
    }
}
