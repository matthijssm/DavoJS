import { Davo } from "../Davo";

describe("davojs", () => {

    it("should do something on parse function", () => {
        const result = Davo.parse("test");

        expect(result).toBeTruthy();
    })
})
