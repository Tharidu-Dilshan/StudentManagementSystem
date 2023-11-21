const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv/config");
import logger from "./utils/logger";
import {connect} from "./utils/dbConnection";

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2>🧑🏻‍🎓 Student Management System API</h2>");
  next();
});

app.listen(PORT, () => {
  logger.info(` Server is up and running on PORT ${PORT}`);
  connect();
});