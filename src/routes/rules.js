/** @format */
const express = require("express");
const RulesRouter = express.Router();

const { QuerySerializer } = require("../serializer");

class RulesRouterSerializer extends QuerySerializer {
  constructor(request, error = {}) {
    super(request, error, "tableName");
  }
  getResponse() {}
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
  response.send(rulesSerializer.getResponse());
});

module.exports = {
  RulesRouter,
};
