import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/foo', (req, res, next) => {
  res.json({foo: 'bar'});
});

app.listen(PORT, () => {
  console.log(`Service is running on port ${PORT}`);
});
