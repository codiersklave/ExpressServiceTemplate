import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import db from "#models/index";

// Import middlewares
import {responseWrapper} from "#middlewares/responseWrapper";

// Import routers
import {personRouter} from "#routes/personRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(responseWrapper);

app.use(personRouter());

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Service is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
