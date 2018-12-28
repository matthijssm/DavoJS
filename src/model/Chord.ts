import { Modifier, Quality } from "./SheetChord";

export type Key = "A" | "B" | "C" | "D" | "E" | "F" | "G";

const REGEX_MINOR_CHORD = /^m(?!aj)/g;

const REGEX_DIMINISHED_CHORD = /^dim/g;

const REGEX_AUGMENTED_CHORD = /^aug/g;

export class Chord {
    constructor(
        public base: Key,
        public modifier: Modifier,
        public suffix?: string,
        public bassBase?: Key,
        public bassModifier?: Modifier,
    ) {}

    get adjectives(): string {
        if (!this.suffix) return "";

        let adjectives = this.suffix.replace(REGEX_MINOR_CHORD, "");

        adjectives = adjectives.replace(REGEX_DIMINISHED_CHORD, "");

        adjectives = adjectives.replace(REGEX_AUGMENTED_CHORD, "");

        return adjectives;
    }

    get chordBaseString(): string {
        return this.base + this.modifierString;
    }

    get bassBaseString(): string {
        return this.bassBase + this.bassModifierString;
    }

    get quality(): Quality {
        if (this.suffix) {
            if (this.suffix.match(REGEX_MINOR_CHORD)) {
                return Quality.MINOR;
            }

            if (this.suffix.match(REGEX_DIMINISHED_CHORD)) {
                return Quality.DIMINISHED;
            }

            if (this.suffix.match(REGEX_AUGMENTED_CHORD)) {
                return Quality.AUGEMENTED;
            }
        }

        return Quality.MAJOR;
    }

    get modifierString(): "#" | "b" | "" {
        switch (this.modifier) {
            case Modifier.FLAT:
                return "b";
            case Modifier.SHARP:
                return "#";
            default:
                return "";
        }
    }
    get bassModifierString(): "#" | "b" | "" {
        switch (this.bassModifier) {
            case Modifier.FLAT:
                return "b";
            case Modifier.SHARP:
                return "#";
            default:
                return "";
        }
    }

    toString(): string {
        const chordString = this.base + (this.modifierString || "") + (this.suffix || "");

        if (this.bassBase) {
            return `${chordString}/${this.bassBase}${this.bassModifier || ""}`;
        }

        return chordString;
    }
}
