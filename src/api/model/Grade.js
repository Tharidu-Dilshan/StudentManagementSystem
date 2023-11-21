const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    id: String,
    grade: String,
    marks: Number
});

module.exports = mongoose.model('Grade', GradeSchema);
