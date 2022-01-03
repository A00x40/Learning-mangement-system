const mongoose = require('mongoose');

const resultsSchema = new mongoose.Schema({
    quiz : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Quiz',
        required: true
    } ,
    score : { 
        type: Number, 
        required: true 
    } ,
    maximum : { 
        type: Number, 
        required: true 
    } ,
    grade : { 
        type: String,
        required: true 
    }
});

const Results = mongoose.model('Results', resultsSchema);
module.exports = { Results, resultsSchema };