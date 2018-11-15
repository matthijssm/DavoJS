export interface Directive {
	type: DirectiveType;
	value: string | null;
}

export enum DirectiveType {
	TITLE,
	SUBTITLE,
	ARTIST,
	COMPOSER,
	LYRICIST,
	COPYRIGHT,
	ALBUM,
	YEAR,
	KEY,
	TIME,
	TEMPO,
	DURATION,
	CAPO,
	META,
	START_OF_CHORUS,
	END_OF_CHORUS,
	START_OF_VERSE,
	END_OF_VERSE,
	UNKNOWN,
}

export const DIRECTIVE_REGEX = /{[A-Z,a-z]+:?.*}/g;

export namespace DirectiveUtil {
	export function getDirectives(document: string): Directive[] {
		const rawDirectives = document.match(DIRECTIVE_REGEX);

		if (rawDirectives) {
			return rawDirectives.map((directive) => {
				return createDirective(directive);
			});
		} else {
			return [];
		}
	}

	export function getSectionDirective(line: string): Directive | null {
		const rawDirectives = line.match(DIRECTIVE_REGEX);

		return rawDirectives ? createSectionDirective(rawDirectives[0]) : null;
	}

	function createSectionDirective(rawDirective: string): Directive {
		return generateDirective(rawDirective, (rawType) => getSectionDirectiveType(rawType));
	}

	function createDirective(rawDirective: string): Directive {
		return generateDirective(rawDirective, (rawType) => getDirectiveType(rawType));
	}

	function generateDirective(rawDirective: string, callback: (rawType: string) => DirectiveType): Directive {
		const directive: Directive = {
			type: DirectiveType.UNKNOWN,
			value: null,
		};

		const splittedDirective = cleanAndSplitDirective(rawDirective);

		directive.type = callback(splittedDirective[0]);
		if (splittedDirective[1]) {
			directive.value = splittedDirective[1].trim();
		}

		return directive;
	}

	function cleanAndSplitDirective(rawDirective: string): string[] {
		const cleanedDirective = rawDirective.replace("{", "").replace("}", "");
		return cleanedDirective.split(":", 2);
	}

	function getSectionDirectiveType(rawType: string): DirectiveType {
		const type = rawType.toLowerCase().trim();

		switch (type) {
			case "soc":
			case "start_of_chorus":
				return DirectiveType.START_OF_CHORUS;
			case "eoc":
			case "end_of_chorus":
				return DirectiveType.END_OF_CHORUS;
			case "sov":
			case "start_of_verse":
				return DirectiveType.START_OF_VERSE;
			case "eov":
			case "end_of_verse":
				return DirectiveType.END_OF_VERSE;
		}

		return DirectiveType.UNKNOWN;
	}

	function getDirectiveType(rawType: string): DirectiveType {
		const type = rawType.toLowerCase().trim();

		switch (type) {
			case "title":
			case "t":
				return DirectiveType.TITLE;
			case "subtitle":
			case "st":
				return DirectiveType.SUBTITLE;
			case "artist":
			case "a":
				return DirectiveType.ARTIST;
			case "key":
			case "k":
				return DirectiveType.KEY;
			case "capo":
			case "c":
				return DirectiveType.CAPO;
			case "composer":
				return DirectiveType.COMPOSER;
			case "lyricist":
				return DirectiveType.LYRICIST;
			case "copyright":
				return DirectiveType.COPYRIGHT;
			case "album":
				return DirectiveType.ALBUM;
			case "year":
				return DirectiveType.YEAR;
			case "time":
				return DirectiveType.TIME;
			case "tempo":
				return DirectiveType.TEMPO;
			case "duration":
				return DirectiveType.DURATION;
			case "meta":
				return DirectiveType.META;
		}

		return DirectiveType.UNKNOWN;
	}
}
