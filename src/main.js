/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const { FactsRouter } = require("./routes/facts.js");
const { RulesRouter } = require("./routes/rules.js");
const { SERVER_PORT } = require("../config");

const main = () => {
  const app = express();
  //>>>Initial<<<
  app.use(bodyParser.json());
  app.use(function (req, res, next) {
    //>>Middleware<<
    res.setHeader("Access-Control-Allow-Methods", "GET");
    next();
  });
  //>>>Services<<<
  app.use("/facts", FactsRouter);
  app.use("/rules", RulesRouter);
  app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
};

main();
