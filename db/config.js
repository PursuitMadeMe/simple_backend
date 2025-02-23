const pgp = require("pg-promise")(); // Import pg-promise to talk to the database
require("dotenv").config(); // Load the .env file

// Get the settings from .env
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

// Set up the connection to the database
const cn = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
};

const db = pgp(cn); // Create a database object

module.exports = db; // Export so we can use it in other files

/**
It reads the database settings from .env.
It connects to the database.
It exports the database connection so we can use it elsewhere.
 */