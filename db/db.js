const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-cuu7hf1opnds739u4260-a',
  user: 'apigamers_user',
  password: 'hNOaqmdW3OURiBNOV7i3gvpQROcrzJo5',
  database: 'apigamers',
  port: 5432,
  allowExitOnIdle: true
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};