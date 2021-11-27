/** @format */
const express = require("express");
const { FactsEngine } = require("../engine/facts-engine");

const { QuerySerializer } = require("../serializer");

class FactsRouterSerializer extends QuerySerializer {
  constructor(request, error = {}, queryParam = "tableName") {
    super(request, error, queryParam);
  }
  getResponse() {
    const tableName = this.data;
    const factsEngine = new FactsEngine();
    return factsEngine.getAnalysis(tableName);
  }
}

const FactsRouter = express.Router();

FactsRouter.get("/", (request, response) => {
  const factsSerializer = new FactsRouterSerializer(request);
  if (!factsSerializer.isValid()) {
    response.status(factsSerializer.error.code).send(factsSerializer.error.errorMsg);
    return;
  }
  const response = factsSerializer.getResponse();
  response.send(response);
  return;
});

module.exports = {
  FactsRouter,
  FactsRouterSerializer,
};
