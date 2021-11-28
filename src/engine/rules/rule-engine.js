/** @format */

const { RuleFactory } = require("./rule-factory");
const { RuleManager } = require("./rule-manager");
const { FactsEngine } = require("../facts/facts-engine");

class RuleEngine {
  constructor() {
    this.factEngine = new FactsEngine();
    this.ruleManager = new RuleManager();
  }
  async getTableReport(tableName) {
    const tableFactsReport = await this.factEngine.getTableReport(tableName);
    const rules = RuleFactory();
    const result = this.ruleManager.resolveRules(rules, tableFactsReport);
    return result;
  }
}

module.exports = {
  RuleEngine,
};
