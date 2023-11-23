const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Department = require('./Department');

const SubjectSchema = new mongoose.Schema({
    id: Number,
    code: String,
    departmentId: { type: String, ref: Department },
    name: String,
    credits: Number
});

module.exports = mongoose.model('Subject', SubjectSchema);
