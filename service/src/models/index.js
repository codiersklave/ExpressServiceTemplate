import {Sequelize} from "sequelize";
import dbConfig from "#config/database";

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  logging: false, // comment this line out to enable logging
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
import PersonModel from "#models/PersonModel";
import PersonHistoryModel from "#models/PersonHistoryModel";

// Add models
db.PersonModel = PersonModel(sequelize);
db.PersonHistoryModel = PersonHistoryModel(sequelize);

export default db;
