/** @format */

const { QuerySets } = require("../query-sets");

class FactsQuerySets {
  constructor() {
    this.querySets = new QuerySets("fact");
  }
  getImplemented() {
    return ["Number-of-rows", "Number-of-indexes", "has-primary-key", "primary-key-count-columns"];
  }
  getLogicQueries() {
    const logicQueryies = {};
    this.getImplemented().map((name) => {
      logicQueryies[name] = this.querySets.getQuery(name);
    });
    return logicQueryies;
  }
}

module.exports = {
  FactsQuerySets,
};
