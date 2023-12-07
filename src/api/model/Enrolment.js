const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Subject = require ('./Subject');

const EnrolmentSchema = new mongoose.Schema({
    
    studentRegistrationNumber: { type: Schema.Types.ObjectId, ref: 'Student',required: true },
    subjectCode: { type: Schema.Types.ObjectId, ref: 'Subject',required: true },
    status: {type:String , enum:['Pending','Passed','Failed'], default:'Pending'}
},{timestamps:true});

module.exports = mongoose.model('Enrolment', EnrolmentSchema);
