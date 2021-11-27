/** @format */

const { RuleManager } = require("./rule-manager");
const { HIGHER_NUMBER_COLUMNS_RULE, HIGH_NUMBER_ROWS_RULE } = require("../../../config");

const RulesImplemented = [
  RuleManager.createRule({
    name: "high number of rows",
    message: "Warning! Large table. The number of rows is number-of rows",
    conditionFunc: (report) => report["Number-of-rows"] > HIGH_NUMBER_ROWS_RULE,
  }),
  RuleManager.createRule({
    name: "No Primary Key",
    message: "Message:  Warning: the table doesn’t have a PK.",
    conditionFunc: (report) => !report["has-primary-key"],
  }),
  RuleManager.createRule({
    name: "a Primary Key with many columns",
    message: "High number of columns in the PK. and the value of the fact",
    conditionFunc: (report) => report["primary-key-count-columns"] > HIGHER_NUMBER_COLUMNS_RULE,
  }),
];

module.exports = {
  RulesImplemented,
};
