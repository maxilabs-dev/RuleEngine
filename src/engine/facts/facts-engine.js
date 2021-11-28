/** @format */

const { FactRunManager } = require("./fact-run-manager");
const { FactTableDatabase } = require("./fact-table-database");
const { FactsFactory } = require("./facts-factory");

class FactsTableEngine {
  // get table facts , run facts by their dependencies
  constructor(tableName, factTasks = undefined) {
    this.factsFactory = new FactsFactory();
    this.db = new FactTableDatabase(tableName);
    this.factRunManager = new FactRunManager();
    this.factTasks = factTasks;
  }

  initialize() {
    return this.db.initialize();
  }
  async getFacts() {
    this.factTasks = this.factsFactory.getFactTasks();
    let result = {};

    for (const factTask of this.factTasks) {
      const factResult = await this.getFactTaskResult(factTask, result);
      result = { ...result, ...factResult };
    }
    return result;
  }
  async getFactTaskResult(fact, resultCollected) {
    const { shouldSkip, result } = this.factRunManager.shouldSkipFact(fact, resultCollected);
    if (shouldSkip) {
      return await this.db.getFactResultDict(fact.name, result);
    }
    const factResult = await this.db.runFactTask(fact.name, fact.queryString);

    return factResult;
  }
}

class FactsEngine {
  async getTableReport(tableName) {
    const tableEngine = new FactsTableEngine(tableName);
    tableEngine.initialize();
    return tableEngine.getFacts();
  }
}

module.exports = {
  FactsEngine,
  FactsTableEngine,
};
