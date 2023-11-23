const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Subject = require ('./Subject');

const EnrolmentSchema = new mongoose.Schema({
    id: Number,
    studentRegistrationNumber: { type: Schema.Types.ObjectId, ref: 'Student' },
    subjectCode: { type: String, ref: Subject },
    status: String
});

module.exports = mongoose.model('Enrolment', EnrolmentSchema);
