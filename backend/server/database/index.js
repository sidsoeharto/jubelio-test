const pgp = require('pg-promise')();
require('dotenv').config();

const env = process.env;

const connectionString = 
  `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`

console.log(connectionString)

const db = pgp(connectionString);

module.exports = db;