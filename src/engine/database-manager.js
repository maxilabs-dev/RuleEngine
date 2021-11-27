/** @format */

const { Database } = require("../database/database");
const { DATABASE_CONNECTION, DATABASE_DIALECT } = require("../../config");

class DatabaseManager {
  constructor(database_connection = DATABASE_CONNECTION, database_dialect = DATABASE_DIALECT) {
    this.db = new Database(database_connection, database_dialect);
  }
  getReport(...kwargs) {
    throw new Error("not implemented");
  }
  getData(...kwargs) {
    this.initializeEngine();
    const analysisRsponse = this.getReport(...kwargs);
    return analysisRsponse;
  }

  async runParallelDictResult(promises) {
    const resultsArray = await Promise.all(promises);
    let parallelResult = {};
    resultsArray.map((result) => {
      parallelResult = { ...parallelResult, ...result };
    });
    return parallelResult;
  }
  async initializeEngine() {
    this.db.initialize();
    const Isconnected = await this.db.testConnection();
    return Isconnected;
  }
  async runRawQuery(rawQuery, config = {}) {
    const rawResult = await this.db.runRawQuery(rawQuery, config);
    const result = this.isSingleRecordResult(rawResult) ? rawResult[""] : rawResult;
    return result;
  }
  isSingleRecordResult(rawResult) {
    return rawResult && rawResult !== undefined && "" in rawResult;
  }
}

module.exports = {
  DatabaseManager,
};
