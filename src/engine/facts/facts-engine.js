/** @format */

const { Engine } = require("../engine");
const { FactsQuerySets } = require("./facts-querysets");
const { FactQueryGenerator } = require("./query-generate");
const { FactSerializer } = require("./serializer");

class FactsTableEngine extends Engine {
  constructor(tableName) {
    super();
    this.querySets = new FactsQuerySets();
    this.tableName = tableName;
    this.queryGenerator = new FactQueryGenerator(tableName);
  }

  async getReport() {
    const querySets = this.querySets.getLogicQueries();
    let results = {};
    for (const [name, rawQuery] of Object.entries(querySets)) {
      const factResult = await this.getFactResult(name, rawQuery);
      results = { ...results, ...factResult };
    }
    return results;
  }
  async getFactResult(name, rawQuery) {
    const runQuery = this.queryGenerator.generateQuery(rawQuery);
    const result = await this.runRawQuery(runQuery);
    const factResult = new FactSerializer(name, result).getData();
    return factResult;
  }
}

class FactsEngine {
  async getTableReport(tableName) {
    const tableEngine = new FactsTableEngine(tableName);
    tableEngine.initializeEngine();
    return tableEngine.getReport();
  }
}

module.exports = {
  FactsEngine,
  FactsTableEngine,
};
