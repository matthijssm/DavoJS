import { Chord } from "../../model/Chord";
import { Modifier } from "../../model/SheetChord";
import { SheetChordCreator } from "../utils/SheetChordCreator";

describe("SheetChordGenerator should create valid sheetchords from normal chords", () => {
	it("should generate a valid chordmap for C key", () => {
		const chord = new Chord("C", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["C", 1], ["D", 2], ["E", 3], ["F", 4], ["G", 5], ["A", 6], ["B", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([["C", 1], ["D", 2], ["E", 3], ["F", 4], ["G", 5], ["A", 6], ["B", 7]]),
		);
	});

	it("should generate a valid chordmap for D key", () => {
		const chord = new Chord("D", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["D", 1], ["E", 2], ["F#", 3], ["G", 4], ["A", 5], ["B", 6], ["C#", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([["D", 1], ["E", 2], ["F#/Gb", 3], ["G", 4], ["A", 5], ["B", 6], ["C#/Db", 7]]),
		);
	});

	it("should generate a valid chordmap for E key", () => {
		const chord = new Chord("E", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["E", 1], ["F#", 2], ["G#", 3], ["A", 4], ["B", 5], ["C#", 6], ["D#", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([
				["E", 1],
				["F#/Gb", 2],
				["G#/Ab", 3],
				["A", 4],
				["B", 5],
				["C#/Db", 6],
				["D#/Eb", 7],
			]),
		);
	});

	it("should generate a valid chordmap for F key", () => {
		const chord = new Chord("F", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["F", 1], ["G", 2], ["A", 3], ["Bb", 4], ["C", 5], ["D", 6], ["E", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([["F", 1], ["G", 2], ["A", 3], ["A#/Bb", 4], ["C", 5], ["D", 6], ["E", 7]]),
		);
	});

	it("should generate a valid chordmap for G key", () => {
		const chord = new Chord("G", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["G", 1], ["A", 2], ["B", 3], ["C", 4], ["D", 5], ["E", 6], ["F#", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([["G", 1], ["A", 2], ["B", 3], ["C", 4], ["D", 5], ["E", 6], ["F#/Gb", 7]]),
		);
	});

	it("should generate a valid chordmap for A key", () => {
		const chord = new Chord("A", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["A", 1], ["B", 2], ["C#", 3], ["D", 4], ["E", 5], ["F#", 6], ["G#", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([["A", 1], ["B", 2], ["C#/Db", 3], ["D", 4], ["E", 5], ["F#/Gb", 6], ["G#/Ab", 7]]),
		);
	});

	it("should generate a valid chordmap for B key", () => {
		const chord = new Chord("B", Modifier.NONE);
		const creator = new SheetChordCreator(chord);
		expect(creator.chordMap).toEqual(
			new Map<string, number>([["B", 1], ["C#", 2], ["D#", 3], ["E", 4], ["F#", 5], ["G#", 6], ["A#", 7]]),
		);
		expect(creator.keyMap).toEqual(
			new Map<string, number>([
				["B", 1],
				["C#/Db", 2],
				["D#/Eb", 3],
				["E", 4],
				["F#/Gb", 5],
				["G#/Ab", 6],
				["A#/Bb", 7],
			]),
		);
	});

	describe("the creator should create valid nashville chords in the key of C", () => {
		let creator: SheetChordCreator;

		beforeAll(() => {
			creator = new SheetChordCreator(new Chord("C", Modifier.NONE));
		});

		it("should generate the correct SheetChord for C chord", () => {
			const chord = creator.getSheetChord(new Chord("C", Modifier.NONE));

			expect(chord.base).toBe(1);
		});

		it("should generate the correct SheetChord for F# chord", () => {
			const chord = creator.getSheetChord(new Chord("F", Modifier.SHARP));

			expect(chord.base).toBe(4);
			expect(chord.modifier).toBe(Modifier.SHARP);
		});

		it("should generate the correct SheetChord for Bb chord", () => {
			const chord = creator.getSheetChord(new Chord("B", Modifier.FLAT));

			expect(chord.base).toBe(7);
			expect(chord.modifier).toBe(Modifier.FLAT);
		});
	});

	describe("the creator should create valid nashville chords in the key of A", () => {
		let creator: SheetChordCreator;

		beforeAll(() => {
			creator = new SheetChordCreator(new Chord("A", Modifier.NONE));
		});

		it("should generate the correct SheetChord for C chord", () => {
			const chord = creator.getSheetChord(new Chord("C", Modifier.NONE));

			expect(chord.base).toBe(3);
			expect(chord.modifier).toBe(Modifier.SHARP);
		});
	});
});
