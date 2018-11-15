import { SheetLine } from "../../model/SheetLine";
import { DIRECTIVE_REGEX, DirectiveUtil } from "./DirectiveUtils";

export const SECTION_DATA_REGEX = /.*:$/gm;

export namespace LineUtils {
	export function containsSectionData(line: string): boolean {
		return !!DirectiveUtil.getSectionDirective(line) || !!line.match(SECTION_DATA_REGEX);
	}

	export function containsDirective(line: string): boolean {
		return !!line.match(DIRECTIVE_REGEX);
	}

	export function parseLine(line: string): SheetLine {
		return new SheetLine(line);
	}
}
