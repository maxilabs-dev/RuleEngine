/** @format */

const { DatabaseManager } = require("../database-manager");
const { FactQueryFormat } = require("./query-format");
const { FactSerializer } = require("./serializer");

class FactTableDatabase {
  constructor(tableName) {
    this.queryFormat = new FactQueryFormat(tableName);
    this.db = new DatabaseManager();
  }
  initialize() {
    return this.db.initialize();
  }
  async runFactTask(name, rawQuery) {
    const result = await this.getQueryResult(rawQuery);
    const factResult = this.getFactResultDict(name, result);
    return factResult;
  }
  async getQueryResult(rawQuery) {
    const runQuery = this.queryFormat.generateQuery(rawQuery);
    return await this.db.runRawQuery(runQuery);
  }
  getFactResultDict(name, factQueryResult) {
    return new FactSerializer(name, factQueryResult).getFactResult();
  }
}
module.exports = {
  FactTableDatabase,
};
