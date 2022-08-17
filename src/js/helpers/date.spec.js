import { formatDate } from './date';

describe("formatDate", () => {
    it('check format', () => {
        expect(formatDate(1659014248000, "yyyy")).toBe("2022");
    })
});