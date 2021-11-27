/** @format */

const { RULE_NOT_APPLIED } = require("../../../config");

class Rule {
  constructor(name, message, conditionFunc) {
    this.name = name;
    this.message = message;
    this.conditionFunc = conditionFunc;
  }
  getMessage(report) {
    if (this.conditionFunc(report) === false) {
      return RULE_NOT_APPLIED;
    }
    this.message;
  }
}

module.exports = {
  Rule,
};
