const { Pool } = require('pg');

// Setup your PostgreSQL connection details here
const pool = new Pool({
  user: 'postgres',        // replace with your PostgreSQL username
  host: 'localhost',               // usually localhost for local dev
  database: 'errandspider', // replace with your database name
  password: 'Rkcdg@2437',   // replace with your database password
  port: 5432,                     // default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
