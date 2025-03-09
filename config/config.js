import { postgresConfig } from "../src/config/constants.js";

const config = {
  development: {
    username: postgresConfig.username,
    password: postgresConfig.password,
    database: postgresConfig.dbName,
    host: postgresConfig.host,
    dialect: postgresConfig.dialect
  },
  test: {
    username: postgresConfig.username,
    password: postgresConfig.password,
    database: postgresConfig.dbName,
    host: postgresConfig.host,
    dialect: postgresConfig.dialect
  },
  production: {
    username: postgresConfig.username,
    password: postgresConfig.password,
    database: postgresConfig.dbName,
    host: postgresConfig.host,
    dialect: postgresConfig.dialect
  }
}

export default config;
