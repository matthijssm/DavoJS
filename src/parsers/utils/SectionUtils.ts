import { SheetLine } from "../../model/SheetLine";
import { SheetSection } from "../../model/SheetSection";
import { Directive, DirectiveType, DirectiveUtil } from "./DirectiveUtils";
import { LineUtils } from "./LineUtils";

export namespace SectionUtils {
	export function parseSection(section: string): SheetSection[] {
		const sections = section.split(/[\r\n]{2,}/gm);

		const modelSections: SheetSection[] = [];

		sections.forEach((section) => {
			const modelSection = new SheetSection();

			const lines = section.split(/[\r\n]{1}/g);

			const modelLines = processLines(lines, modelSection);

			if (modelLines.length) {
				modelSections.push(modelSection);
			}

			return modelSection;
		});

		return modelSections;
	}

	function processLines(lines: string[], section: SheetSection): SheetLine[] {
		const modelLines: SheetLine[] = [];

		if (lines.length) {
			lines.forEach((line, index) => {
				if (index === 0 && LineUtils.containsSectionData(line)) {
					setSectionMetaData(line, section);
					return;
				}

				if (LineUtils.containsDirective(line)) {
					return;
				}

				const newLine = LineUtils.parseLine(line);

				section.lines.push(newLine);
				modelLines.push(newLine);
			});
		}

		return modelLines;
	}

	function setSectionMetaData(line: string, section: SheetSection) {
		const sectionDirective = DirectiveUtil.getSectionDirective(line);
		if (sectionDirective) {
			setTypeAndLabelFromDirective(sectionDirective, section);
		} else {
			const label = line.replace(":", "").trim();

			if (line.toLowerCase().includes("chorus")) {
				section.type = "Chorus";
				section.label = label;
			} else {
				section.type = "Verse";
				section.label = label;
			}
		}
	}

	function setTypeAndLabelFromDirective(directive: Directive, section: SheetSection) {
		switch (directive.type) {
			case DirectiveType.START_OF_CHORUS:
				section.type = "Chorus";
				if (directive.value) {
					section.label = directive.value.trim();
				} else {
					section.label = "Chorus";
				}
				break;
			case DirectiveType.START_OF_VERSE:
				section.type = "Verse";
				if (directive.value) {
					section.label = directive.value.trim();
				} else {
					section.label = "";
				}
				break;
		}
	}
}
