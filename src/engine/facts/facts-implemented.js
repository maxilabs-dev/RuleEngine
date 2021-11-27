/** @format */

const { Fact } = require("./fact");
const { QuerySets } = require("./query-sets");

class FactsImplemeneted {
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
  getFactQueries() {
    const facts = this.getImplemented().map((fact) => {
      fact.addQueryString(this.querySets.getQuery(fact.name));
      return fact;
    });
    return facts;
  }
}

module.exports = {
  FactsImplemeneted,
};
