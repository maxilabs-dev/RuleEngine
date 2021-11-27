/** @format */

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DATABASE_CONNECTION =
  process.env.DATABASE_CONNECTION || "Data Source=metisdb1.database.windows.net;Initial Catalog=ORM;User Id=user1;Password=Trustno1;";
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || "mssql";

//Rules
const HIGH_NUMBER_ROWS_RULE = process.env.HIGH_NUMBER_ROWS_RULE || 10000000;
const HIGHER_NUMBER_COLUMNS_RULE = process.env.HIGHER_NUMBER_COLUMNS_RULE || 4;
const RULE_NOT_APPLIED = false;

module.exports = {
  SERVER_PORT,
  DATABASE_CONNECTION,
  DATABASE_DIALECT,
  HIGH_NUMBER_ROWS_RULE,
  HIGHER_NUMBER_COLUMNS_RULE,
  RULE_NOT_APPLIED,
};
