export interface ISheetMetaData {
	title: string | null;
	subtitle: string | null;
	artist: string | null;
	composer: string | null;
	lyricist: string | null;
	copyright: string | null;
	album: string | null;
	year: string | null;
	key: string | null; // TODO - Add key enum
	time: string | null;
	tempo: number | null;
	duration: string | null;
	capo: number | null;
	meta: string | null;
}
