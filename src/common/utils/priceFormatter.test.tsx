import { priceFormatter } from "./priceFormatter";

describe("priceFormatter", () => {
  test("formats number price to correct USA price", () => {
    expect(priceFormatter.format(50)).toBe("$50");
  });
});
