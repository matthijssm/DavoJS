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
	UNKNOWN,
}

const directiveRegex = /{[A-z]+:[A-z, ]*}/g;

export namespace DirectiveUtil {
	export function getDirectives(document: string): Directive[] {
		const rawDirectives = document.match(directiveRegex);

		if (rawDirectives) {
			return rawDirectives.map((directive) => {
				return cleanDirective(directive);
			});
		} else {
			return [];
		}
	}

	function cleanDirective(rawDirective: string): Directive {
		const directive: Directive = {
			type: DirectiveType.UNKNOWN,
			value: null,
		};

		rawDirective.replace("{", "");
		rawDirective.replace("}", "");

		const splittedDirective = rawDirective.split(":", 2);

		directive.type = getDirectiveType(splittedDirective[0]);
		directive.value = splittedDirective[1];

		return directive;
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
