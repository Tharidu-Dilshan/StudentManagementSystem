const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger").default;
const connect = require("./utils/dbConnection").connect;
const appRoutes = require("./api/routes/appRoutes");

const app = express();
const PORT = process.env.PORT || "8090";

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res, next) => {
  res.send("<h2>🧑🏻‍🎓 Student Management System API</h2>");
  next();
});

app.use(appRoutes);
app.listen(PORT, () => {
  logger.info(` Server is up and running on PORT ${PORT}`);
  connect();
});
