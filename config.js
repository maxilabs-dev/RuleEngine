/** @format */

const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DATABASE_CONNECTION =
  process.env.DATABASE_CONNECTION || "Data Source=metisdb1.database.windows.net;Initial Catalog=ORM;User Id=user1;Password=Trustno1;";
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || "mssql";
module.exports = {
  SERVER_PORT,
  DATABASE_CONNECTION,
  DATABASE_DIALECT,
};
