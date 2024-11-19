import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import db from "#models/index";

// Import middlewares

// Import routers

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/foo', (req, res, next) => {
  res.json({foo: 'bar'});
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Service is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
