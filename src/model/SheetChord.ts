import { AbstractElement } from "./AbstractElement";

export enum Modifier {
    SHARP,
    FLAT,
    NONE,
}

export enum Quality {
    MAJOR,
    MINOR,
    DIMINISHED,
    AUGEMENTED,
}

export class SheetChord extends AbstractElement {
    position: number = 0;

    constructor(
        public base: number,
        public modifier: Modifier = Modifier.NONE,
        public quality: Quality,
        public adjectives: string = "",
        public inversionBase?: number,
        public inversionModifier: Modifier = Modifier.NONE,
    ) {
        super();
    }

    get chordBase(): string {
        return `${this.base}${this.getModifierString(this.modifier)}`;
    }

    getModifierString(modifier: Modifier): "#" | "b" | "" {
        switch (modifier) {
            case Modifier.FLAT:
                return "b";
            case Modifier.SHARP:
                return "#";
            default:
                return "";
        }
    }

    getQualityString(): "-" | "°" | "+" | "" {
        switch (this.quality) {
            case Quality.MINOR:
                return "-";
            case Quality.DIMINISHED:
                return "°";
            case Quality.AUGEMENTED:
                return "+";
            default:
                return "";
        }
    }

    toString() {
        let output = "";

        output += `${this.base}${this.getModifierString(this.modifier)}${this.getQualityString()}${this.adjectives}`;

        if (this.inversionBase) {
            output += `/${this.inversionBase}${this.getModifierString(this.inversionModifier)}`;
        }

        return output;
    }
}
