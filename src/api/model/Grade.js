const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    
    grade: {type:String ,required:true},
    marks: {type:Number ,required:true}
});

module.exports = mongoose.model('Grade', GradeSchema);
