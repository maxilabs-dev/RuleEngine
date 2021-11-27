/** @format */
const express = require("express");
const RulesRouter = express.Router();

const { QuerySerializer } = require("../serializer");

class RulesRouterSerializer extends QuerySerializer {
  constructor(request, error = {}) {
    super(request, error, "tableName");
  }
  getResponseData() {}
}

RulesRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

RulesRouter.get("/", (request, response) => {
  const rulesSerializer = new RulesRouterSerializer(request);
  if (rulesSerializer.isValid()) {
    response.status(rulesSerializer.error.code).send(rulesSerializer.error.errorMsg);
  }
  const data = rulesSerializer.getResponseData();
  response.send(data);
});

module.exports = {
  RulesRouter,
};
