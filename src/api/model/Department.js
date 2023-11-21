const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    id: String,
    code: String,
    name: String
});

module.exports = mongoose.model('Department', DepartmentSchema);
