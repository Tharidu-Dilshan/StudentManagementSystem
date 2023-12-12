const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new mongoose.Schema({
  code: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: "Department" },
  name: { type: String, required: true },
  credits: { type: Number, required: true },
});

module.exports = mongoose.model("Subject", SubjectSchema);
