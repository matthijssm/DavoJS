import { SheetLine } from "../../model/SheetLine";
import { SheetSection } from "../../model/SheetSection";
import { Directive, DirectiveType, DirectiveUtil } from "./DirectiveUtils";
import { LineUtils } from "./LineUtils";
import { Chord } from "../../model/Chord";

export namespace SectionUtils {
    export function getSections(document: string, key: Chord): SheetSection[] {
        const sections = document.split(/[\r\n]{2,}/gm);

        const sheetSectionCollection: SheetSection[] = [];

        sections.forEach(section => parseSection(section, sheetSectionCollection, key));

        return sheetSectionCollection;
    }

    function parseSection(section: string, collection: SheetSection[], key: Chord): void {
        const sectionModel = new SheetSection();

        const lines = section.split(/[\r\n]{1}/g);

        if (lines.length) {
            fillSectionWithLines(lines, sectionModel, key);

            if (sectionModel.lines.length) {
                collection.push(sectionModel);
            }
        }
    }

    function fillSectionWithLines(lines: string[], section: SheetSection, key: Chord): void {
        lines.forEach((line, index) => {
            // Check if the first line of the section is a directive we need to parse
            if (index === 0 && LineUtils.containsSectionData(line)) {
                setSectionMetaData(line, section);
                return;
            }

            // TODO: Parse comment as directive or with a sharp sign.
            if (LineUtils.containsDirective(line)) {
                return;
            }

            const newLine = LineUtils.parseLine(line, key);

            section.lines.push(newLine);
        });
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
