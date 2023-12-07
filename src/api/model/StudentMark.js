const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const StudentMarkSchema = new mongoose.Schema({
   
    enrollmentId: { type: Schema.Types.ObjectId, ref: 'Enrolment' },
    grade: { type: Schema.Types.ObjectId, ref: 'Grade' }
});

module.exports = mongoose.model('StudentMark', StudentMarkSchema);
