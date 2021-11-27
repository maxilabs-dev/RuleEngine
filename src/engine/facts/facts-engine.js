/** @format */

const { Engine } = require("../engine");
const { FactsQuerySets } = require("./facts-querysets");

class FactSerializer {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  getData() {
    return {
      [this.name]: this.value,
    };
  }
}

class FactQueryGenerator {
  constructor(tableName) {
    this.tableName = tableName;
  }
  getQuery(rawQuery) {
    return rawQuery.replace("$(table-name)", this.tableName);
  }
}

class FactsEngine extends Engine {
  constructor() {
    super();
    this.querySets = new FactsQuerySets();
  }

  async getAnalysisResponse(tableName) {
    const querySets = this.querySets.getLogicQueries();
    const queryGenerator = new FactQueryGenerator(tableName);
    let results = {};
    for (const [name, rawQuery] of Object.entries(querySets)) {
      const result = await this.runRawQuery(queryGenerator.getQuery(rawQuery));
      const factResult = new FactSerializer(name, result).getData();
      results = { ...results, ...factResult };
    }
    return results;
  }
}

module.exports = {
  FactsEngine,
};
