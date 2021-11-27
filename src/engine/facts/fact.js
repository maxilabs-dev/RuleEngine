/** @format */

class Fact {
  constructor(name, dependencyName = undefined, queryString = undefined) {
    this.name = name;
    this.dependencyName = dependencyName;
    this.queryString = queryString;
  }
  isDependency() {
    return this.dependencyName !== undefined;
  }
  addQueryString(query) {
    this.queryString = query;
  }
}

module.exports = {
  Fact,
};
