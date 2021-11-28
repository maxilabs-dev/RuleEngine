/** @format */

const { Rule } = require("./rule");
const { RULE_NOT_APPLIED } = require("../../../config");

class RuleManager {
  constructor(rulePassedValue = "PASSED") {
    this.rulePassedValue = rulePassedValue;
  }
  static createRule({ name, message, conditionFunc }) {
    return new Rule((name = name), (message = message), (conditionFunc = conditionFunc));
  }
  resolveRules(rules, factsReport) {
    let result = {};
    rules.map((rule) => {
      const message = rule.getMessage(factsReport);
      if (RULE_NOT_APPLIED !== message) {
        result[rule.name] = message;
      } else {
        result[rule.name] = this.rulePassedValue;
      }
    });
    return result;
  }
}

module.exports = {
  RuleManager,
};
