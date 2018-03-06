const helper = require("../helper/index/.js");

test("expects postalcode to be passed  correctly", () => {
  expect(helper.fetchBusinessIds(postalCode)).toBe(postalCode);
});

test("expects business to be set", () => {
  expect(helper.componentDidMount(business)).toBe(business);
});

test("expects response to be matching businesses", () => {
  expect(helper.fetchBusinessIds(response)).toBe(
    "these should be 3 matching zip businesses"
  );
});
