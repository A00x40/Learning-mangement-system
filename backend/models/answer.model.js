const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({      
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Learner',
        required: true
    } ,
    text: {
        type: String,
        required: true,
        unique: true 
    } ,
    upvoteCount: {
        type: Number,
        default: 0
    } 
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = { Answer, answerSchema };