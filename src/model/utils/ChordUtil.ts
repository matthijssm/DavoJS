import { Chord, Key, Modifier } from "../Chord";
import { SheetChord } from "../SheetChord";

export namespace ChordUtil {
	export function parse(chordString: string): SheetChord | null {
		return parseStringToChord(
			chordString,
			(base: Key, modifier: Modifier, suffix: string, bassBase: Key, bassModifier: Modifier) => {
				return new SheetChord(
					base.toUpperCase() as Key,
					modifier as Modifier,
					suffix,
					bassBase ? (bassBase.toUpperCase() as Key) : undefined,
					bassModifier as Modifier,
				);
			},
		) as SheetChord | null;
	}

	export function parseNormalChord(chordString: string): Chord | null {
		return parseStringToChord(
			chordString,
			(base: Key, modifier: Modifier, suffix: string, bassBase: Key, bassModifier: Modifier) => {
				return new Chord(base as Key, modifier as Modifier, suffix, bassBase as Key, bassModifier as Modifier);
			},
		);
	}

	function parseStringToChord(
		chordString: string,
		callback: (
			base: Key,
			modifier: Modifier,
			suffix: string,
			bassBase: Key,
			bassModifier: Modifier,
		) => Chord | SheetChord,
	): Chord | SheetChord | null {
		const chordRegex = /([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?/i;

		const parts = chordRegex.exec(chordString);

		if (parts) {
			const [, base, modifier, suffix, , bassBase, bassModifier] = parts;
			return callback(base as Key, modifier as Modifier, suffix, bassBase as Key, bassModifier as Modifier);
		}

		return null;
	}
}
