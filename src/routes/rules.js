/** @format */
const express = require("express");
const { RuleEngine } = require("../engine/rules/rule-engine");
const { QuerySerializer } = require("../serializer");

class RulesRouterSerializer extends QuerySerializer {
  constructor(request, error = {}) {
    super(request, error, "tableName");
  }
  async getResponseData() {
    const tableName = this.data;
    const ruleEngine = new RuleEngine();
    try {
      return await ruleEngine.getTableReport(tableName);
    } catch (error) {
      throw new Error({ code: 500, msg: error });
    }
  }
}

const RulesRouter = express.Router();

RulesRouter.get("/", async (request, response) => {
  const rulesSerializer = new RulesRouterSerializer(request);
  if (!rulesSerializer.isValid()) {
    response.status(rulesSerializer.error.code).send(rulesSerializer.error.errorMsg);
    return;
  }
  try {
    const data = await rulesSerializer.getResponseData();
    response.send(data);
    return;
  } catch (error) {
    response.status(500).send(error.message);
    return;
  }
});

module.exports = {
  RulesRouter,
};
