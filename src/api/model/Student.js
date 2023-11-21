const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: String,
    id: String,
    age: Number,
    gender: String,
    address: String,
    registerNumber: String
});

module.exports = mongoose.model('Student', StudentSchema);
