import { Chord, Key } from "../Chord";
import { SheetChord, Modifier } from "../SheetChord";

export namespace ChordUtil {
    export function parse(chordString: string): Chord | null {
        const chordRegex = /([A-G]|[a-g])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?/i;

        const parts = chordRegex.exec(chordString);

        if (parts) {
            const [, base, modifier, suffix, , bassBase, bassModifier] = parts;
            return new Chord(
                base as Key,
                parseModifier(modifier),
                suffix,
                bassBase as Key,
                parseModifier(bassModifier),
            );
        }

        return null;
    }

    export function parseModifier(modifierString: string): Modifier {
        switch (modifierString) {
            case "b":
                return Modifier.FLAT;
            case "#":
                return Modifier.SHARP;
            default:
                return Modifier.NONE;
        }
    }
}
