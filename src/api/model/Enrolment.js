const mongoose = require('mongoose');

const EnrolmentSchema = new mongoose.Schema({
    id: String,
    studentRegistrationNumber: String,
    subjectCode: String,
    status: String
});

module.exports = mongoose.model('Enrolment', EnrolmentSchema);
