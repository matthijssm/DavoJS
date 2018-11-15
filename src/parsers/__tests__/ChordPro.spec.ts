import fs from "fs";

import { parse } from "url";
import { ChordProParser } from "../ChordProParser";

describe("parsers.ChordPro", () => {
	describe("Good chopro file", () => {
		const document = fs.readFileSync(`${process.cwd()}/test/The Great I Am.chopro`, "utf8");

		const parsed = ChordProParser.parse(document);

		it("should have a id", () => {
			expect(parsed.ID).not.toBeUndefined();
		});

		it("should have parsed the title correctly", () => {
			expect(parsed.metadata.title).toBe("The Great I Am");
		});

		it("should have parsed the artist correctly", () => {
			expect(parsed.metadata.artist).toBe("New Life");
		});

		it("should have parsed the subtitle correctly", () => {
			expect(parsed.metadata.subtitle).toBe("Amazing Song");
		});

		it("should have parsed the key correctly", () => {
			expect(parsed.metadata.key).not.toBeNull();
			expect(parsed.metadata.key!.toString()).toBe("A");
		});

		it("should have parsed the composer correctly", () => {
			expect(parsed.metadata.composer).toBe("HillSong");
		});

		it("should have parsed the tempo correctly", () => {
			expect(parsed.metadata.tempo).toBe(140);
		});

		it("should have parsed the time correctly", () => {
			expect(parsed.metadata.time).toBe("4/4");
		});

		describe("should have parsed all the sections", () => {
			it("should have the correct amount of sections", () => {
				expect(parsed.sections.length).toBe(6);
			});

			it("should have the correct label for each section", () => {
				expect(parsed.sections[0].label).toBe("Verse 1");
				expect(parsed.sections[1].label).toBe("Chorus");
				expect(parsed.sections[2].label).toBe("Verse 2");
				expect(parsed.sections[3].label).toBe("Interlude");
				expect(parsed.sections[4].label).toBe("Bridge");
				expect(parsed.sections[5].label).toBe("Outro");
			});

			it("should have the correct type for each section", () => {
				expect(parsed.sections[0].type).toBe("Verse");
				expect(parsed.sections[1].type).toBe("Chorus");
				expect(parsed.sections[2].type).toBe("Verse");
				expect(parsed.sections[3].type).toBe("Verse");
				expect(parsed.sections[4].type).toBe("Verse");
				expect(parsed.sections[5].type).toBe("Verse");
			});
		});
	});

	describe("Bad examples", () => {
		const document = fs.readFileSync(`${process.cwd()}/test/Bad Sheet.chopro`, "utf8");

		const parsed = ChordProParser.parse(document);

		it("should have parsed the title correctly", () => {
			expect(parsed.metadata.title).toBe("Character.Character2;3");
		});

		it("should have parsed the artist correctly", () => {
			expect(parsed.metadata.artist).toBe("Live@New Life");
		});

		it("should have parsed the subtitle correctly", () => {
			expect(parsed.metadata.subtitle).toBe(",.;'[]Character");
		});

		it("should have parsed the key correctly", () => {
			expect(parsed.metadata.key).toBeNull();
		});

		it("should have parsed the composer correctly", () => {
			expect(parsed.metadata.composer).toBe("HillSong");
		});

		it("should have parsed the tempo correctly", () => {
			expect(parsed.metadata.tempo).toBeNaN();
		});

		it("should have parsed the time correctly", () => {
			expect(parsed.metadata.time).toBe("16/4");
		});

		it("should have no sections", () => {
			expect(parsed.sections.length).toBe(0);
		});
	});
});
