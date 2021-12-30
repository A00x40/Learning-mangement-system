const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    course : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course',
        required: true
    } ,
    learner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Learner',
        required: true
    } ,
    marks : {
        type: String, 
        default: 0 
    } ,
    progress : {
        type: Number, 
        min: 0,
        max: 100,
        default: 0 
    }
});

const Results = mongoose.model('Course', resultsSchema)
module.exports = { Results, resultsSchema }