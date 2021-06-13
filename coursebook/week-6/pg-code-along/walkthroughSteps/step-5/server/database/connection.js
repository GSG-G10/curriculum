const { Pool } = require('pg');
require('env2')('./config.env');

if (!process.env.DB_URL) throw new Error('No Database URL!!!');

const params = new URL(process.env.DB_URL);

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: params.username,
  password: params.password,
  ssl: params.hostname !== 'localhost'
};

// another way 

// const options = {
//   connectionString : process.env.DB_URL,
//   ssl: true
// };

module.exports = new Pool(options);
