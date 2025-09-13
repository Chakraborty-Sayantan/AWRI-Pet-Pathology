const { Pool } = require('pg');

// Create a new pool of connections to the database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export a query function that uses the pool to execute queries
module.exports = {
  query: (text, params) => pool.query(text, params),
  // Also export the pool itself for transaction management
  pool: pool,
};