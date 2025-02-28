const { Pool } = require('pg');

const pool = new Pool({
  host: "dpg-cv12ait6l47c73er1aig-a",
  user: "dbgamerstore",
  password: "2frs6l8q3zu6JjVfjrxHXRuXASL7BwRl",
  database: "apigamers",
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};