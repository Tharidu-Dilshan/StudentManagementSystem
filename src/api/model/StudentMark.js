const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Enrolment = require('./Enrolment');
const Grade = require('./Grade');


const StudentMarkSchema = new mongoose.Schema({
    id: Number,
    enrollmentId: { type: Number, ref: Enrolment },
    grade: { type: String, ref: Grade }
});

module.exports = mongoose.model('StudentMark', StudentMarkSchema);
