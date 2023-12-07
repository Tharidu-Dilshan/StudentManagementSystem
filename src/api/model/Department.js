const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    
    code: {type:String ,required:true},
    name: {type:String ,required:true}
});

module.exports = mongoose.model('Department', DepartmentSchema);
