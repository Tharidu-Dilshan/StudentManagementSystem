const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  minRange: { type: Number, required: true },
  maxRange: { type: Number, required: true },
});

module.exports = mongoose.model("Grade", GradeSchema);
