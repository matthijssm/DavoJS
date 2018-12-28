export enum ParserErrorType {
    MISSING_KEY,
}

export class ParserError extends Error {
    constructor(public type: ParserErrorType, ...params: any[]) {
        super(...params);
    }
}
