/** @format */

const FACT_PASS_VALUES = ["false", false, 0];

class FactRunManager {
  constructor(factPassValues = FACT_PASS_VALUES) {
    this.factPassValues = factPassValues;
    this.defaultNonPassValue = {
      shouldSkip: false,
      result: undefined,
    };
  }
  shouldSkipFact(fact, factResults) {
    if (!fact.isFactNameRequired()) {
      return this.defaultNonPassValue;
    }
    if (!(fact.dependencyName in factResults)) {
      return this.defaultNonPassValue;
    }

    const factResult = factResults[fact.dependencyName];
    for (const factPassValue of this.factPassValues) {
      if (factPassValue === factResult) {
        return {
          shouldSkip: true,
          result: factResult,
        };
      }
    }

    return this.defaultNonPassValue;
  }
}

module.exports = {
  FactRunManager,
};
