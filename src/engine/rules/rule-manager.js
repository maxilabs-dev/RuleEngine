/** @format */

const { RULE_NOT_APPLIED } = require("../../../config");
const { Rule } = require("./rule");

class RuleManager {
  static createRule({ name, message, conditionFunc }) {
    return new Rule((name = name), (message = message), (conditionFunc = conditionFunc));
  }
  static resolveRules(rules, factsReport) {
    let result = {};
    rules.map((rule) => {
      const message = rule.getMessage(factsReport);
      if (RULE_NOT_APPLIED !== message) {
        result[rule.name] = message;
      } else {
        result[rule.name] = "PASSED";
      }
    });
    return result;
  }
}

module.exports = {
  RuleManager,
};
