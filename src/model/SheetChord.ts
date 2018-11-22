import { Chord, Key, Modifier } from "./Chord";

export class SheetChord extends Chord {
	public position: number = 0;

	constructor(base?: Key, modifier?: Modifier, suffix?: string, bassBase?: Key, bassModifier?: Modifier) {
		super(base, modifier, suffix, bassBase, bassModifier);
	}
}
