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
import ClientModel from "#models/ClientModel";
import ClientHistoryModel from "#models/ClientHistoryModel";
import PersonModel from "#models/PersonModel";
import PersonHistoryModel from "#models/PersonHistoryModel";
import UserModel from "#models/UserModel";
import UserHistoryModel from "#models/UserHistoryModel";

// Add models
db.ClientModel = ClientModel(sequelize);
db.ClientHistoryModel = ClientHistoryModel(sequelize);
db.PersonModel = PersonModel(sequelize);
db.PersonHistoryModel = PersonHistoryModel(sequelize);
db.UserModel = UserModel(sequelize);
db.UserHistoryModel = UserHistoryModel(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
