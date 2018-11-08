import uuid = require("uuid");

export abstract class Element {
    public ID: string;

    constructor() {
        this.ID = uuid.v4();
    }
}