/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://juunlpgj:cT2DoDfJknYYcKQVHdi-_IGF6umskeij@kashin.db.elephantsql.com/juunlpgj",
  DATABASE_URL_DEVELOPMENT = "postgres://emgawehe:3w9O43g-GsfbdK7g4kMxM_9Z21TMowDA@kashin.db.elephantsql.com/emgawehe",
  DATABASE_URL_TEST = "postgres://xvoxbddq:u792bEhbP2SGyAXR6iggRoLlAJQAR6cj@kashin.db.elephantsql.com/xvoxbddq",
  DATABASE_URL_PREVIEW = "postgres://ocjqglkm:3jsKfcdXiROB3DOcyzxBd1-q2u2GsIDI@kashin.db.elephantsql.com/ocjqglkm",
  DEBUG,
  // DATABASE_URL = "postgresql://postgres@localhost/postgres",
  // DATABASE_URL_DEVELOPMENT = "postgresql://postgres@localhost/postgres",
  // DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres",
  // DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  // DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    // debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    // debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    // debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    // debug: !!DEBUG,
  },
};
