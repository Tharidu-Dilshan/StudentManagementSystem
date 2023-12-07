const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {type:String ,required:true},
    age: {type:Number ,required:true},
    gender: {type:String ,required:true , enum:['male','female']},
    address: {type:String ,required:true},
    registerNumber: {
        type:String,
        require:true
    }
});

module.exports = mongoose.model('Student', StudentSchema);
