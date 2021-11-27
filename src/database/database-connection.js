/** @format */

const parser = require("mssql-connection-string");

class MssqlConnectionParser {
  constructor(connectionString) {
    this.parser = parser(connectionString);
  }
  getDatabase() {
    return this.parser.options.database;
  }
  getHost() {
    return this.parser.host;
  }
  getPort() {
    return this.parser.options.port || "";
  }
  getUserName() {
    return this.parser.user;
  }
  getPassword() {
    return this.parser.password;
  }
}

const IMPLEMENTED_PARSERS = {
  mssql: MssqlConnectionParser,
};

class DatabaseStringConnection {
  constructor(connectionString, dialect) {
    this.connectionString = connectionString;
    this.dialect = dialect;
    this.parser = undefined;
  }
  getParser() {
    if (this.parser === undefined) {
      try {
        this.parser = new IMPLEMENTED_PARSERS[this.dialect](this.connectionString);
      } catch (error) {
        console.error(`Couldnt not parse string=${this.connectionString}\nError=${error}`);
      }
    }
    return this.parser;
  }
  getDatabase() {
    return this.getParser().getDatabase();
  }
  getName() {
    return this.getParser().getName();
  }
  getPassword() {
    return this.getParser().getPassword();
  }
  getHost() {
    return this.getParser().getHost();
  }
  getPort() {
    return this.getParser().getPort();
  }
}

module.exports = {
  DatabaseStringConnection,
};
