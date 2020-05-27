import { Config } from "knex";
require("ts-node/register");

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: "ts",
      tableName: "knex_migrations",
      directory: "migrations",
    },
    seeds: {
      extension: "ts",
      directory: "seeds",
    },
  } as Config,
  production: {} as Config,
};

export = knexConfig;
