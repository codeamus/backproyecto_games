const { Pool } = require('pg');

const pool = new Pool({
  host: "postgres.railway.internal",
  user: "postgres",
  password: "DskKIrduCfgoVvYLvtIeWfgicftZnqYR",
  database: "railway",
  port: 5432,
  allowExitOnIdle: true,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};