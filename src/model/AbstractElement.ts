import uuid = require("uuid");

export abstract class AbstractElement {
    ID: string;

    constructor() {
        this.ID = uuid.v4();
    }
}
