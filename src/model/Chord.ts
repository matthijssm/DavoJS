export type Key = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type Modifier = "#" | "b";

export class Chord {
	constructor(
		private base?: Key,
		private modifier?: Modifier,
		private suffix?: string,
		private bassBase?: Key,
		private bassModifier?: Modifier,
	) {}

	public toString(): string {
		const chordString = this.base + (this.modifier || "") + (this.suffix || "");

		if (this.bassBase) {
			return `${chordString}/${this.bassBase}${this.bassModifier || ""}`;
		}

		return chordString;
	}
}
