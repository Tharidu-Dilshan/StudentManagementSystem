const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    id: String,
    code: String,
    departmentId: String,
    name: String,
    credits: Number
});

module.exports = mongoose.model('Subject', SubjectSchema);
