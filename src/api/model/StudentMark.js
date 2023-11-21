const mongoose = require('mongoose');

const StudentMarkSchema = new mongoose.Schema({
    id: String,
    enrolmentId: String,
    grade: String
});

module.exports = mongoose.model('StudentMark', StudentMarkSchema);
