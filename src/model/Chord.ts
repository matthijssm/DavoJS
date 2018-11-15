export type Key = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type Modifier = "#" | "b";

export class Chord {
	constructor(private base?: Key, private modifier?: Modifier, private suffix?: string, private bassBase?: Key, private bassModifier?: Modifier) {}

	// public clone(): Chord {
	// 	const { base, modifier, suffix, bassBase, bassModifier } = this;
	// 	return new Chord(base, modifier, suffix, bassBase, bassModifier);
	// }

	// public normalize() {
	// 	return processChord(this, normalize);
	// }

	// public switchModifier() {
	// 	return processChord(this, switchModifier);
	// }

	// public useModifier(newModifier) {
	// 	return processChord(this, useModifier, newModifier);
	// }

	// public transposeUp() {
	// 	return processChord(this, transposeUp);
	// }

	// public transposeDown() {
	// 	return processChord(this, transposeDown);
	// }

	// public transpose(delta) {
	// 	return processChord(this, transpose, delta);
	// }

	public toString(): string {
		const chordString = this.base + (this.modifier || "") + (this.suffix || "");

		if (this.bassBase) {
			return `${chordString}/${this.bassBase}${this.bassModifier || ""}`;
		}

		return chordString;
	}
}
