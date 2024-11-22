import dotenv from "dotenv";

dotenv.config({path: "./.env"});

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT, DB_PORT} = process.env;

export default {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
};
