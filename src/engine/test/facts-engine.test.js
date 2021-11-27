/** @format */

const { FactsEngine } = require("../facts-engine");

it("We check the initialization facts engine", () => {
  const factsEngine = new FactsEngine();
});

// The assertion for a promise must be returned.
it("engine factsEngine should pass either in production or testing environment", () => {
  const factsEngine = new FactsEngine();
  return factsEngine.testConnection().then((isConnected) => expect(isConnected).toEqual(true));
});
