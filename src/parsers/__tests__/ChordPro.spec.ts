import fs from "fs";

import { ChordProParser } from "../ChordProParser";

describe("parsers.ChordPro", () => {
	describe("Good chopro file", () => {
		const document = fs.readFileSync(`${process.cwd()}/test/The Great I Am.chopro`, "utf8");

		const parsed = ChordProParser.parse(document);

		console.log(parsed.metadata);

		it("should have parsed the title correctly", () => {
			expect(parsed.metadata.title).toBe("The Great I Am");
		});
	});
});
