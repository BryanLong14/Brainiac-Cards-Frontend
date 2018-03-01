import transformer from './transformer';

describe('transformer', () => {
    it('should transform', () => {
        const expected = [{ definition: "Defintion Entry", synonyms: "Synonyms ", word: "Test WOrd Entry", level: "2" }];
        const input = [
        { column: 0, id: 0, newValue: "sdf", oldValue: "", row: 1, type: "change" }, 
        { column: 0, id: 1, newValue: "sdf", oldValue: "", row: 1, type: "change" }, 
        { column: 0, id: 2, newValue: "sdf", oldValue: "", row: 1, type: "change" }, 
        { column: 0, id: 3, newValue: "sdf", oldValue: "", row: 1, type: "change" }];
        const actual = transformer(input);
        expect(actual).toEqual(expected);
    })
})