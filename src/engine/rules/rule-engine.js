/** @format */

const { RulesImplemented } = require("./rule-implemented");
const { RuleManager } = require("./rule-manager");
const { FactsEngine } = require("../facts/facts-engine");

class RuleEngine {
  constructor() {
    this.factEngine = new FactsEngine();
  }
  async getTableReport(tableName) {
    const tableFactsReport = await this.factEngine.getTableReport(tableName);
    const result = RuleManager.resolveRules(RulesImplemented, tableFactsReport);
    return result;
  }
}

module.exports = {
  RuleEngine,
};
