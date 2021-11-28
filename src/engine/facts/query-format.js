/** @format */

class FactQueryFormat {
  constructor(tableName, replaceValue = "$(table-name)") {
    this.tableName = tableName;
    this.replaceValue = replaceValue;
  }
  generateQuery(rawQuery) {
    return rawQuery.replace(this.replaceValue, this.tableName);
  }
}

module.exports = {
  FactQueryFormat,
};
