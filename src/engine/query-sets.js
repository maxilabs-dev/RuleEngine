/** @format */
const querySetsImplemented = require("./query-sets-implemented.json");
const path = require("path");
const dirname = `${path.resolve(".")}/src/engine`;
const fs = require("fs");

class QuerySets {
  constructor(category) {
    this.category = category;
    this.querySetsImplemented = querySetsImplemented;
  }
  getQuery(key) {
    if (!(this.category in this.querySetsImplemented)) {
      throw new Error(`${this.category} not implemented in query sets files`);
    }
    const querySetsFiles = this.querySetsImplemented[this.category];
    if (!(key in querySetsFiles)) {
      throw new Error(`Key ${key} not implemented in ${this.category}`);
    }
    const filePath = this.querySetsImplemented[this.category][key];
    return this.readFile(filePath);
  }
  readFile(filePath) {
    try {
      let data = fs.readFileSync(path.join(dirname, filePath), "utf8");
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
