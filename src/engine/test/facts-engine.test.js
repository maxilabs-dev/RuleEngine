/** @format */

// const { jest } = require("@jest/globals");
const { FactsEngine, FactsTableEngine } = require("../facts/facts-engine");
jest.setTimeout(45000);
it("We check the initialization facts table engine", () => {
  const factsEngine = new FactsTableEngine();
});

it("engine FactsTableEngine should pass either in production or testing environment", () => {
  const factsEngine = new FactsTableEngine();
  expect.assertions(1);
  return factsEngine.initializeEngine().then((isConnected) => expect(isConnected).toEqual(true));
});

it("engine factsEngine should pass either in production or testing environment", () => {
  expect.assertions(1);
  const factsEngine = new FactsEngine();
  const expected = { "Number-of-indexes": 1, "Number-of-rows": 5, "has-primary-key": "true", "primary-key-count-columns": 1 };
  return factsEngine.getTableReport("Students").then((results) => expect(results).toEqual(expected));
});
