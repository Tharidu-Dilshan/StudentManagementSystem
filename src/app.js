const express = require("express");
const cors = require("cors");
import logger from "./utils/logger";
import {connect} from "./utils/dbConnection";
const studentRoutes = require("./api/routes/Student");
const departmentRoutes = require("./api/routes/Department");
const enrolmentRoutes = require("./api/routes/Enrolment");
const gradeRoutes = require("./api/routes/grade");
const studentMarkRoutes = require("./api/routes/StudentMark");
const subjectRoutes = require("./api/routes/Subject");


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

app.use("/students",studentRoutes);
app.use("/department",departmentRoutes);
app.use("/enrolment",enrolmentRoutes);
app.use("/grade",gradeRoutes);
app.use("/studentMark",studentMarkRoutes);
app.use("/subject",subjectRoutes);