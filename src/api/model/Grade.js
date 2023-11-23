const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    id: Number,
    grade: String,
    marks: Number
});

module.exports = mongoose.model('Grade', GradeSchema);
