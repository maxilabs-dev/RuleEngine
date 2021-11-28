/** @format */
const path = require("path");
const fs = require("fs");
const CURRENT_DIRNAME = `${path.resolve(".")}/src/engine`;

class QuerySets {
  constructor(path = "/facts/sql", dirname = CURRENT_DIRNAME) {
    this.path = path;
    this.dirname = dirname;
  }
  getQuery(filePath) {
    const filePathSql = path.join(this.path, `${filePath}.sql`);
    return this.readFile(filePathSql);
  }
  readFile(filePath) {
    try {
      let data = fs.readFileSync(path.join(this.dirname, filePath), "utf8");
      data = this.cleanData(data);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  cleanData(data) {
    return data.replace("\n", " ");
  }
}

module.exports = {
  QuerySets,
};
