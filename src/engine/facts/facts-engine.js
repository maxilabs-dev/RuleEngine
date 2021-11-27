/** @format */

const { DatabaseManager } = require("../database-manager");
const { FactsImplemeneted } = require("./facts-implemented");
const { FactQueryFormat } = require("./query-format");
const { FactSerializer } = require("./serializer");

class FactsTableEngine extends DatabaseManager {
  constructor(tableName) {
    super();
    this.factQuery = new FactsImplemeneted();
    this.tableName = tableName;
    this.queryFormat = new FactQueryFormat(tableName);
  }

  async getReport() {
    const factQueries = this.factQuery.getFactQueries();
    let result = {};

    for (const fact of factQueries) {
      const factResult = await this.getFactResultNestedLogic(fact, result);
      result = { ...result, ...factResult };
    }
    return result;
  }
  async getFactResultNestedLogic(fact, resultCollected) {
    if (fact.isDependency()) {
      if (fact.dependencyName in resultCollected) {
        const condition = resultCollected[fact.dependencyName];
        if (condition === "false" || condition === false) {
          return new FactSerializer(fact.name, "false").getData();
        }
      }
    }
    const factResult = await this.getFactResult(fact.name, fact.queryString);

    return factResult;
  }
  async getFactResult(name, rawQuery) {
    const runQuery = this.queryFormat.generateQuery(rawQuery);
    const result = await this.runRawQuery(runQuery);
    const factResult = new FactSerializer(name, result).getData();
    return factResult;
  }
  async getReportParralel() {
    const querySets = this.querySets.getLogicQueries();
    let factsPromises = [];

    for (const [name, rawQuery] of Object.entries(querySets)) {
      const factResult = this.getFactResult(name, rawQuery);
      factsPromises.push(factResult);
    }
    const result = await this.runParallelDictResult(factsPromises);
    return result;
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
