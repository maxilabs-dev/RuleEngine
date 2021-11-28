/** @format */

class Fact {
  constructor(name, factNameRequired = undefined, queryString = undefined) {
    this.name = name;
    this.factNameRequired = factNameRequired;
    this.queryString = queryString;
  }
  isFactNameRequired() {
    return this.factNameRequired !== undefined;
  }
  addQueryString(query) {
    this.queryString = query;
  }
}

module.exports = {
  Fact,
};
