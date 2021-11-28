/** @format */
const express = require("express");
const { FactsEngine } = require("../engine/facts/facts-engine");

const { QuerySerializer } = require("../serializer");

class FactsRouterSerializer extends QuerySerializer {
  constructor(request, error = {}, queryParam = "tableName") {
    super(request, error, queryParam);
  }
  getResponseData() {
    const tableName = this.data;
    const factsEngine = new FactsEngine();
    try {
      return factsEngine.getTableReport(tableName);
    } catch (error) {
      throw new Error({ code: 500, msg: error });
    }
  }
}

const FactsRouter = express.Router();

FactsRouter.get("/", async (request, response) => {
  const factsSerializer = new FactsRouterSerializer(request);
  if (!factsSerializer.isValid()) {
    response.status(factsSerializer.error.code).send(factsSerializer.error.errorMsg);
    return;
  }
  let data;
  try {
    data = await factsSerializer.getResponseData();
    response.send(data);
    return;
  } catch (error) {
    response.status(500).send(error.message);
    return;
  }
});

module.exports = {
  FactsRouter,
  FactsRouterSerializer,
};
