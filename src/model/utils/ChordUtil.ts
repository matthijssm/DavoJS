import { Chord, Key, Modifier } from "../Chord";

export namespace ChordUtil {
	export function parse(chordString: string): Chord | null {
		const chordRegex = /([A-G])(#|b)?([^/\s]*)(\/([A-G])(#|b)?)?/i;

		const parts = chordRegex.exec(chordString);

		if (parts) {
			const [, base, modifier, suffix, , bassBase, bassModifier] = parts;
			return new Chord(base as Key, modifier as Modifier, suffix, bassBase as Key, bassModifier as Modifier);
		}

		return null;
	}
}

// const A = 'A'.charCodeAt(0);
// const G = 'G'.charCodeAt(0);

// const keyChange = (key, delta) => {
//     let charCode;
//     charCode = key.toUpperCase().charCodeAt(0);
//     charCode += delta;

//     if (charCode > G) {
//         charCode = A;
//     }

//     if (charCode < A) {
//         charCode = G;
//     }

//     return String.fromCharCode(charCode);
// };

// const keyUp = key => keyChange(key, 1);

// const keyDown = key => keyChange(key, -1);

// const normalize = (base, modifier) => {
//     if (modifier === '#' && /^(B|E)$/.test(base)) {
//         return [keyUp(base), null];
//     }

//     if (modifier === 'b' && /^(C|F)$/.test(base)) {
//         return [keyDown(base), null];
//     }

//     return [base, modifier];
// };

// const internalSwitchModifier = (base, modifier) => {
//     if (modifier === '#') {
//         return [keyUp(base), 'b'];
//     }

//     if (modifier === 'b') {
//         return [keyDown(base), '#'];
//     }

//     throw new Error(`Unexpected modifier ${modifier}`);
// };

// const switchModifier = (base, modifier) => {
//     const [normalizedBase, normalizedModifier] = normalize(base, modifier);

//     if (modifier) {
//         return internalSwitchModifier(normalizedBase, normalizedModifier);
//     }

//     return [normalizedBase, normalizedModifier];
// };

// const useModifier = (base, modifier, newModifier) => {
//     if (modifier && modifier !== newModifier) {
//         return internalSwitchModifier(base, modifier);
//     }

//     return [base, modifier];
// };

// const repeatProcessor = (base, modifier, processor, amount) => {
//     let [processedBase, processedModifier] = [base, modifier];

//     for (let i = 0; i < amount; i += 1) {
//         [processedBase, processedModifier] = processor(processedBase, processedModifier);
//     }

//     return [processedBase, processedModifier];
// };

// const transposeUp = (base, modifier) => {
//     const [normalizedBase, normalizedModifier] = normalize(base, modifier);

//     if (normalizedModifier === 'b') {
//         return [normalizedBase, null];
//     }

//     if (normalizedModifier === '#') {
//         return [keyUp(normalizedBase), null];
//     }

//     if (/^(B|E)$/.test(normalizedBase)) {
//         return [keyUp(normalizedBase), null];
//     }

//     return [normalizedBase, '#'];
// };

// const transposeDown = (base, modifier) => {
//     const [normalizedBase, normalizedModifier] = normalize(base, modifier);

//     if (normalizedModifier === 'b') {
//         return [keyDown(normalizedBase), null];
//     }

//     if (normalizedModifier === '#') {
//         return [normalizedBase, null];
//     }

//     if (/^(C|F)$/.test(normalizedBase)) {
//         return [keyDown(normalizedBase), null];
//     }

//     return [normalizedBase, 'b'];
// };

// const transpose = (base, modifier, delta) => {
//     let [newBase, newModifier] = [base, modifier];

//     if (delta < 0) {
//         [newBase, newModifier] = repeatProcessor(base, modifier, transposeDown, Math.abs(delta));
//     } else if (delta > 0) {
//         [newBase, newModifier] = repeatProcessor(base, modifier, transposeUp, delta);
//     }

//     return useModifier(newBase, newModifier, modifier);
// };

// const processChord = (sourceChord, processor, processorArg) => {
//     const chord = sourceChord.clone();
//     [chord.base, chord.modifier] = processor(sourceChord.base, sourceChord.modifier, processorArg);

//     if (sourceChord.bassBase) {
//         [chord.bassBase, chord.bassModifier] = processor(sourceChord.bassBase, sourceChord.bassModifier, processorArg);
//     }

//     return chord;
// };
