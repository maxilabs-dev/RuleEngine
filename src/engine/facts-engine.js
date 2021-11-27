/** @format */

const { promisify } = require("util");
const { Engine } = require("./engine");

class FactSerializer {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
  getData() {
    return {
      [this.name]: this.value,
    };
  }
}

class FactQueryGenerator {
  constructor(tableName, rawQuery) {
    this.tableName = tableName;
  }
  getQuery(rawQuery) {}
}

class FactsEngine extends Engine {
  constructor() {
    super();
    this.querySets = new FactsQuerySets();
    this.queryGenerator = new FactQueryGenerator(rawQuery);
    promisify(this.db.runRawQuery).bind(this.db);
  }

  async runRawQuery(rawQuery) {
    return await this.db.runRawQuery(rawQuery);
  }

  getAnalysisResponse(tableName) {
    const querySets = this.querySets.getLogicQueries();
    let results = {};
    for (const [name, rawQuery] of Object.entries(querySets)) {
      const result = await this.runRawQuery(this.queryGenerator.getQuery(rawQuery));
      const factResult = new FactSerializer(name, result).getData();
      results = { ...results, ...factResult };
    }
    return results;
  }
}

module.exports = {
  FactsEngine,
};
