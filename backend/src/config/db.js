const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "postgres",
  database: "expressI0n",
  password: "admin",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
