/** @format */
const { Sequelize } = require("sequelize");
const { DatabaseStringConnection } = require("./database-connection");

class DataBaseLogger {
  handle(msg) {
    //Implement furthur logic
    console.log(msg);
  }
}

class Database {
  constructor(connection_string, dialect, session = undefined) {
    this.dbString = new DatabaseStringConnection(connection_string, dialect);
    this.dialect = dialect;
    this.session = session;
  }
  initialize() {
    this.session = new Sequelize(this.dbString.getDatabase(), this.dbString.getName(), this.dbString.getPassword(), {
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
  async runRawQuery(queryString) {
    return await this.session.query(queryString, {
      plain: false,
      raw: true,
    });
  }
}

module.exports = {
  Database,
};
