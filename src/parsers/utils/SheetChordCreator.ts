import { Chord, Key } from "../../model/Chord";
import { Modifier, Quality, SheetChord } from "../../model/SheetChord";

const MAJOR_DISTANCES = [0, 2, 4, 5, 7, 9, 11];
const MINOR_DISTANCES = [0, 1, 3, 5, 6, 8, 10];
const KEY_LIST = ["A", "A#/Bb", "B", "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab"];

const BASE_SHARPS = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const BASE_FLATS = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];

const MAJOR_NASHVILLE = new Map([
	[0, { defaultQuality: Quality.MAJOR, degree: 1 }],
	[2, { defaultQuality: Quality.MINOR, degree: 2 }],
	[4, { defaultQuality: Quality.MINOR, degree: 3 }],
	[5, { defaultQuality: Quality.MAJOR, degree: 4 }],
	[7, { defaultQuality: Quality.MAJOR, degree: 5 }],
	[9, { defaultQuality: Quality.MINOR, degree: 6 }],
	[11, { defaultQuality: Quality.DIMINISHED, degree: 7 }],
]);

const MINOR_NASHVILLE = new Map([
	[0, { defaultQuality: Quality.MINOR, degree: 1 }],
	[1, { defaultQuality: Quality.DIMINISHED, degree: 2 }],
	[3, { defaultQuality: Quality.MAJOR, degree: 3 }],
	[5, { defaultQuality: Quality.MINOR, degree: 4 }],
	[6, { defaultQuality: Quality.MINOR, degree: 5 }],
	[8, { defaultQuality: Quality.MAJOR, degree: 6 }],
	[10, { defaultQuality: Quality.DIMINISHED, degree: 7 }],
]);

export interface KeyMapMeta {
	modifier: Modifier;
	nashvillePosition: number;
	defaultQuality: Quality;
}
export type KeyMap = Map<string, KeyMapMeta>;

export class SheetChordCreator {
	public chordMap: Map<string, number>;
	public keyMap: KeyMap;

	private mode: Modifier;

	constructor(key: Chord) {
		this.mode = this.getMode(key);

		this.keyMap = this.initializeKeyMap(key);
		this.chordMap = this.initializeChordMap(this.keyMap);
	}

	public getSheetChord(chord: Chord): SheetChord {
		return new SheetChord(
			this.chordMap.get(chord.base)!,
			chord.modifier,
			chord.scale,
			chord.suffix,
			this.chordMap.get(chord.bassBase!),
			chord.bassModifier,
		);
	}

	private getNashvillePosition(chord: Chord): number {
		return 0;
	}

	private initializeKeyMap(key: Chord): KeyMap {
		const keys = this.getOrderedKeyList(key);

		return this.buildMap(keys, key.scale);
	}

	private initializeChordMap(keyMap: Map<string, number>): Map<string, number> {
		const chordMap = new Map<string, number>();

		keyMap.forEach((position, key) => {
			const splittedKey = key.split("/");
			if (splittedKey.length > 1 && this.mode === Modifier.FLAT) {
				chordMap.set(splittedKey[1], position);
			} else {
				chordMap.set(splittedKey[0], position);
			}
		});

		return chordMap;
	}
	private getOrderedKeyList(key: Chord): string[] {
		const keys: string[] = KEY_LIST;

		while (!this.compareKeys(keys[0], key)) {
			keys.push(keys.shift()!);
		}

		return keys;
	}

	private buildMap(keys: string[], scale: Scale): KeyMap {
		const keyMap = new Map<string, KeyMapMeta>();

		const distanceMap = scale === Scale.MAJOR ? MAJOR_DISTANCES : MINOR_DISTANCES;

		const emptyKeyMeta: KeyMapMeta = {
			nashvillePosition: 0,
			defaultScale: Scale.MAJOR,
			modifier: Modifier.NONE,
		};

		let nashvilleCount = 1;

		// List = C C#/Db D D#/Eb E F F#/Gb G G#/Ab A A#/Bb B
		// C = C, D, E, F, G, A, Bdim
		// Scale = Major
		// Mode = NONE

		keys.forEach((key, index) => {
			if (distanceMap.indexOf(index) >= 0) {
				emptyKeyMeta.nashvillePosition = nashvilleCount++;
				emptyKeyMeta.defaultScale = scale;
				emptyKeyMeta.modifier = Modifier.NONE;

				keyMap.set(key, emptyKeyMeta);
			}
		});

		return keyMap;
	}

	private compareKeys(keyPair: string, key: Chord) {
		const splitPair: string[] = keyPair.split("/");

		const keyString = this.overwriteChordIfNessecary(key.base + key.modifierString);

		return splitPair.indexOf(keyString) >= 0 ? true : false;
	}

	// Overwrite not existing chords to actual chords.
	private overwriteChordIfNessecary(key: string): string {
		switch (key) {
			case "E#":
				return "F";
			case "Cb":
				return "B";
			case "B#":
				return "C";
			default:
				return key;
		}
	}

	private getMode(key: Chord): Modifier {
		if (key.modifier !== Modifier.NONE) {
			return key.modifier;
		}

		if (key.base === "F") {
			return Modifier.FLAT;
		}

		return Modifier.NONE;
	}
}
