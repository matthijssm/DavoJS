import { SheetSection } from "src/model/SheetSection";
import { ISheetMetaData } from "../model/ISheetMetaData";
import { Sheet } from "../model/Sheet";
import { DirectiveUtil } from "./utils/DirectiveUtils";
import { MetaDataUtils } from "./utils/MetaDataUtils";
import { SectionUtils } from "./utils/SectionUtils";
import { ParserErrorType, ParserError } from "./exceptions/ParserError";
import { Chord } from "../model/Chord";
import { ChordUtil } from "../model/utils/ChordUtil";

export namespace ChordProParser {
    export function parse(document: string, key?: string): Sheet {
        const metaData: ISheetMetaData = collectMetaData(document);

        const sheetModel = new Sheet(metaData);

        // Overwrite given key if it is available
        if (key) {
            sheetModel.metadata.key = ChordUtil.parse(key);
        }

        if (sheetModel.metadata.key === null) {
            throw new ParserError(ParserErrorType.MISSING_KEY, "No valid key is specified for this sheet.");
        }

        sheetModel.addSections(collectSections(document, sheetModel.metadata.key!));

        return sheetModel;
    }

    function collectMetaData(document: string): ISheetMetaData {
        const directives = DirectiveUtil.getSheetDirectives(document);

        const metaData = MetaDataUtils.generateSheetMetaData(directives);

        return metaData;
    }

    function collectSections(document: string, key: Chord): SheetSection[] {
        // TODO - push key to line parsing
        return SectionUtils.getSections(document, key);
    }
}
