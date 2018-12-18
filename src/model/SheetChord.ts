import { Chord, Key } from "./Chord";

const KEY_MAP = new Map<string, number>([["A", 1], ["B", 2], ["C", 3], ["D", 4], ["E", 5], ["F", 6], ["G", 7]]);

const BASE_KEYS = ["A", "B", "C", "D", "E", "F", "G"];

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

export class SheetChord {
	public position: number = 0;

	constructor(
		public base: number,
		public modifier: Modifier = Modifier.NONE,
		public scale: Scale,
		public adjectives: string = "",
		public inversionBase?: number,
		public inversionModifier: Modifier = Modifier.NONE,
	) {}
}
