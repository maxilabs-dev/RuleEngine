/** @format */

class Rule {
  constructor(name, message, conditionFunc) {
    this.name = name;
    this.message = message;
    this.conditionFunc = conditionFunc;
  }
}

module.exports = {
  Rule,
};
