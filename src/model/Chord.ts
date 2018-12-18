import { Modifier, Scale } from "./SheetChord";

export type Key = "A" | "B" | "C" | "D" | "E" | "F" | "G";

const MINOR_REGEX = /^m[a-z,A-Z]{0}/g;

export class Chord {
	constructor(
		public base: Key,
		public modifier: Modifier,
		public suffix?: string,
		public bassBase?: Key,
		public bassModifier?: Modifier,
	) {}

	get scale(): Scale {
		if (this.suffix && MINOR_REGEX.test(this.suffix!)) {
			return Scale.MINOR;
		}

		return Scale.MAJOR;
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

	public toString(): string {
		const chordString = this.base + (this.modifier || "") + (this.suffix || "");

		if (this.bassBase) {
			return `${chordString}/${this.bassBase}${this.bassModifier || ""}`;
		}

		return chordString;
	}
}
