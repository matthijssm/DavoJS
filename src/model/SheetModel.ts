import uuid = require("uuid");
import { IElementHolder } from "./IElementHolder";
import { ISheetMetaData } from "./ISheetMetaData";

export class SheetModel implements IElementHolder {
	private ID: string;

	public readonly elements: Element[] = [];
	public readonly sections: [] = [];

	constructor(readonly metadata: ISheetMetaData) {
		this.ID = uuid.v4();
	}

	public addSection() {}
}
