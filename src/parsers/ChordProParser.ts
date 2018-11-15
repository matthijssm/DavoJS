import { SheetSection } from "src/model/SheetSection";
import { ISheetMetaData } from "../model/ISheetMetaData";
import { SheetModel } from "../model/SheetModel";
import { DirectiveUtil } from "./utils/DirectiveUtils";
import { MetaDataUtils } from "./utils/MetaDataUtils";
import { SectionUtils } from "./utils/SectionUtils";

export namespace ChordProParser {
	export function parse(document: string): SheetModel {
		const metaData: ISheetMetaData = collectMetaData(document);

		const sheetModel = new SheetModel(metaData);

		sheetModel.addSections(collectSections(document));

		return sheetModel;
	}

	function collectMetaData(document: string): ISheetMetaData {
		const directives = DirectiveUtil.getDirectives(document);

		const metaData = MetaDataUtils.generateSheetMetaData(directives);

		return metaData;
	}

	function collectSections(document: string): SheetSection[] {
		return SectionUtils.parseSection(document);
	}

	function parseSection(section: string) {}

	function documentWalker(document: string, callback: (line: string) => void) {
		const lines = document.split("\n");

		lines.forEach((line) => callback(line));
	}
	// public parse(chordProChordSheet) {
	// 	this.warnings = [];

	// 	this.song = new Song();
	// 	this.lineNumber = 1;
	// 	this.sectionType = NONE;
	// 	this.resetTag();
	// 	this.processor = this.readLyrics;
	// 	this.parseDocument(chordProChordSheet);
	// 	this.song.finish();
	// 	return this.song;
	// }

	// parseDocument(document) {
	// 	for (let i = 0, count = document.length; i < count; i += 1) {
	// 		this.processor(document[i]);
	// 	}
	// }

	// public readLyrics(chr) {
	// 	switch (chr) {
	// 		case SHARP_SIGN:
	// 			this.processor = this.readComment;
	// 			break;
	// 		case NEW_LINE:
	// 			this.lineNumber += 1;
	// 			this.song.addLine();
	// 			this.song.setCurrentLineType(this.sectionType);
	// 			break;
	// 		case SQUARE_START:
	// 			this.song.addChordLyricsPair();
	// 			this.processor = this.readChords;
	// 			break;
	// 		case CURLY_START:
	// 			this.processor = this.readTag;
	// 			break;
	// 		default:
	// 			this.song.lyrics(chr);
	// 	}
	// }

	// public readChords(chr) {
	// 	switch (chr) {
	// 		case NEW_LINE:
	// 			break;
	// 		case SQUARE_START:
	// 			break;
	// 		case SQUARE_END:
	// 			this.processor = this.readLyrics;
	// 			break;
	// 		default:
	// 			this.song.chords(chr);
	// 	}
	// }

	// public readTag(chr) {
	// 	switch (chr) {
	// 		case CURLY_END:
	// 			this.finishTag();
	// 			this.processor = this.readLyrics;
	// 			break;
	// 		default:
	// 			this.tag += chr;
	// 	}
	// }

	// public readComment(chr) {
	// 	switch (chr) {
	// 		case NEW_LINE:
	// 			this.processor = this.readLyrics;
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// }

	// public finishTag() {
	// 	const parsedTag = this.song.addTag(this.tag);
	// 	this.applyTag(parsedTag);
	// 	this.resetTag();
	// }

	// public resetTag() {
	// 	this.tag = "";
	// }

	// public applyTag(tag) {
	// 	switch (tag.name) {
	// 		case START_OF_CHORUS:
	// 			this.startSection(CHORUS, tag);
	// 			break;

	// 		case END_OF_CHORUS:
	// 			this.endSection(CHORUS, tag);
	// 			break;

	// 		case START_OF_VERSE:
	// 			this.startSection(VERSE, tag);
	// 			break;

	// 		case END_OF_VERSE:
	// 			this.endSection(VERSE, tag);
	// 			break;

	// 		default:
	// 			break;
	// 	}
	// }

	// public startSection(sectionType, tag) {
	// 	this.checkCurrentSectionType(NONE, tag);
	// 	this.sectionType = sectionType;
	// }

	// public endSection(sectionType, tag) {
	// 	this.checkCurrentSectionType(sectionType, tag);
	// 	this.sectionType = NONE;
	// 	this.song.setCurrentLineType(this.sectionType);
	// }

	// public checkCurrentSectionType(sectionType, tag) {
	// 	if (this.sectionType !== sectionType) {
	// 		this.addWarning(`Unexpected tag {${tag.originalName}, current section is: ${this.sectionType}`);
	// 	}
	// }

	// public addWarning(message) {
	// 	const warning = new ParserWarning(message, this.lineNumber);
	// 	this.warnings.push(warning);
	// }
}
