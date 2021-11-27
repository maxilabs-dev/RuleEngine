/** @format */

// const { jest } = require("@jest/globals");
const { FactsEngine } = require("../facts/facts-engine");
jest.setTimeout(45000);
it("We check the initialization facts engine", () => {
  const factsEngine = new FactsEngine();
});

it("engine factsEngine should pass either in production or testing environment", () => {
  const factsEngine = new FactsEngine();
  expect.assertions(1);
  return factsEngine.initializeEngine().then((isConnected) => expect(isConnected).toEqual(true));
});

it("engine factsEngine should pass either in production or testing environment", () => {
  expect.assertions(2);
  const factsEngine = new FactsEngine();
  factsEngine.initializeEngine().then((isConnected) => expect(isConnected).toEqual(true));
  const expected = { "Number-of-indexes": 1, "Number-of-rows": 5, "has-primary-key": "true", "primary-key-count-columns": 1 };
  return factsEngine.getAnalysisResponse("Students").then((results) => expect(results).toEqual(expected));
});
