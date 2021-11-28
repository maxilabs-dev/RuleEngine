/** @format */
const { Sequelize } = require("sequelize");

const { DatabaseStringConnection } = require("./database-connection");

class DataBaseLogger {
  handle(msg) {
    //Implement furthur logic
    console.log(msg);
  }
}

const DEFAULT_QUERY_CONFIG = {
  plain: true,
  raw: true,
};
class DatabaseClient {
  constructor(connection_string, dialect, session = undefined, QueryAsync = undefined) {
    this.dbString = new DatabaseStringConnection(connection_string, dialect);
    this.dialect = dialect;
    this.session = session;
  }
  initialize() {
    this.session = new Sequelize(this.dbString.getDatabase(), this.dbString.getUserName(), this.dbString.getPassword(), {
      host: this.dbString.getHost(),
      port: this.dbString.getPort(),
      dialect: this.dialect,
      logging: (...msg) => new DataBaseLogger().handle(msg),
    });
  }
  async testConnection() {
    try {
      await this.session.authenticate();
      console.log("Connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }
  async runRawQuery(queryString, config = {}) {
    const queryConfig = { ...DEFAULT_QUERY_CONFIG, ...config };
    const records = await this.session.query(queryString, queryConfig);
    return records;
  }
}

module.exports = {
  DatabaseClient,
};
