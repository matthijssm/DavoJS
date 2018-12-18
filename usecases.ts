import { Davo } from "src/Davo";
import { SectionUtils } from "src/parsers/utils/SectionUtils";

export class useCases {
	public exampleOne() {
		// ChordPro comes in as input
		// DavoJS parses it and returns a SheetModel (everything has a unique ID :o )
		const sheetModel = Davo.parse("[A]This is [D] my song.");
		// SheetModel can be read fully
		sheetModel!.ID;
		sheetModel!.sections[0].lines[0].chords[0].base;
		// SheetModel can be edited with the help of some utils.
        sheetModel!.addSection(SectionUtils.parseSection("[A] This is amazing [D] Technology!")[0]);
        sheetModel!.getSection("ID"); //SheetSection
		sheetModel!.removeSection("ID"); //true or false
		sheetModel!.removeElement("ID"); //true or false
		// SheetModels can be exported to JSON or ChordPro.
		sheetModel.toJson(); // returns a JSON string
		sheetModel.toChordPro(); // returns a string
	}
}
