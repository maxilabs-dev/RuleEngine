/** @format */

const { RuleEngine } = require("../rule-engine");

jest.setTimeout(45000);

const getRuleEngineFixture = () => {
  return new RuleEngine();
};
it("We check the initialization rule engine", () => {
  const ruleEngine = getRuleEngineFixture();
});

it("ruleEngine for Students table", () => {
  expect.assertions(1);
  const ruleEngine = getRuleEngineFixture();
  const expected = {
    "No Primary Key": "PASSED",
    "a Primary Key with many columns": "PASSED",
    "high number of rows": "PASSED",
  };
  return ruleEngine.getTableReport("Students").then((results) => expect(results).toEqual(expected));
});
it("ruleEngine for Courses table", () => {
  expect.assertions(1);
  const ruleEngine = getRuleEngineFixture();
  const expected = {
    "No Primary Key": "PASSED",
    "a Primary Key with many columns": "PASSED",
    "high number of rows": "PASSED",
  };
  return ruleEngine.getTableReport("Courses").then((results) => expect(results).toEqual(expected));
});
