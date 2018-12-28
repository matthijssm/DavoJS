import { Sheet } from "./model/Sheet";
import { ChordProParser } from "./parsers/ChordProParser";

export namespace Davo {
    export function parseChordPro(sheet: string, key?: string): Sheet | undefined {
        return ChordProParser.parse(sheet, key);
    }

    // TODO: Parse comments through the model!
}
