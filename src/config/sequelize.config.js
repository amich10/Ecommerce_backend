import { Sequelize } from "sequelize";
import { postgresConfig } from "./constants.js";
const sequelize = new Sequelize(
  postgresConfig.dbName,
  postgresConfig.username,
  postgresConfig.password,
  {
    host: postgresConfig.host,
    port: postgresConfig.port,
    dialect: postgresConfig.dialect,
    pool: {
      max: 3,
      acquire: 30000, //30 sec
      idle: 10000, //10 sec
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("SQL server connected successfully");
  })
  .catch((error) => {
    console.log("Error established while connecting to SQL", error);
  });

export default sequelize;
