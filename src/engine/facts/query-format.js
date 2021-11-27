/** @format */

class FactQueryFormat {
  constructor(tableName) {
    this.tableName = tableName;
  }
  generateQuery(rawQuery) {
    return rawQuery.replace("$(table-name)", this.tableName);
  }
}

module.exports = {
  FactQueryFormat,
};
