/** @format */

const { Fact } = require("./dataclasses/fact");
const { QuerySets } = require("./query-sets");

class FactsFactory {
  constructor() {
    this.querySets = new QuerySets();
  }
  getImplemented() {
    return [
      new Fact("Number-of-rows"),
      new Fact("Number-of-indexes"),
      new Fact("has-primary-key"),
      new Fact("primary-key-count-columns", "has-primary-key"),
    ];
  }
  getFactTasks() {
    const facts = this.getImplemented().map((fact) => {
      fact.addQueryString(this.querySets.getQuery(fact.name));
      return fact;
    });
    return facts;
  }
}

module.exports = {
  FactsFactory,
};
