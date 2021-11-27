/** @format */

const { Database } = require("../database/database");
const { DATABASE_CONNECTION, DATABASE_DIALECT } = require("../../config");

class Engine {
  constructor(database_connection = DATABASE_CONNECTION, database_dialect = DATABASE_DIALECT) {
    this.db = new Database(database_connection, database_dialect);
  }
  getAnalysisResponse(...kwargs) {
    throw new Error("not implemented");
  }
  getAnalysis(...kwargs) {
    this.initializeEngine();
    const analysisRsponse = this.getAnalysisResponse(...kwargs);
    return analysisRsponse;
  }

  async initializeEngine() {
    this.db.initialize();
    const Isconnected = await this.db.testConnection();
    return Isconnected;
  }
  async runRawQuery(rawQuery) {
    const rawResult= await this.db.runRawQuery(rawQuery);
    return rawResult? :
  }
}

module.exports = {
  Engine,
};
