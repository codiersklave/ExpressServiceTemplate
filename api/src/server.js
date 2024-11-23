import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import db from "#models/index";

// Import middlewares
import {responseWrapper} from "#middlewares/responseWrapper";
import {apiKeyAuth} from "#middlewares/apiKeyAuth";
import {jwtAuth} from "#middlewares/jwtAuth";

// Import routers
import {personRouter} from "#routes/personRouter";
import {userRouter} from "#routes/userRouter";
import {authRouter} from "#routes/authRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(responseWrapper);
app.use(apiKeyAuth);

app.use(personRouter());
app.use(userRouter());
app.use(authRouter());

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Service is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
