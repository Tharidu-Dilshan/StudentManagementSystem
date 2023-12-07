const studentRoutes = require("../routes/Student");
const departmentRoutes = require("../routes/Department");
const enrolmentRoutes = require("../routes/Enrolment");
const gradeRoutes = require("../routes/grade");
const studentMarkRoutes = require("../routes/StudentMark");
const subjectRoutes = require("../routes/Subject");
const express = require("express");
const app = express();


app.use("/students", studentRoutes);
app.use("/department", departmentRoutes);
app.use("/enrolment", enrolmentRoutes);
app.use("/grade", gradeRoutes);
app.use("/studentMark", studentMarkRoutes);
app.use("/subject", subjectRoutes);


module.exports = app;
