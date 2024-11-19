import {Sequelize} from "sequelize";
import dbConfig from "#config/database";

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models

// Add models

export default db;
