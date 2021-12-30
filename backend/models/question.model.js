const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    course : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course',
        required: true
    } ,    
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Learner',
        required: true
    } ,
    title: {
        type: String,
        required: true
    } ,
    text: {
        type: String,
        required: true,
        unique: true 
    } ,
    upvoteCount:  {
        type: Number,
        default: 0
    } ,
    answerCount: {
        type: Number,
        default: 0
    } ,
    answers : [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Answer'
    }] ,   
    bestAnswer : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Answer'
    } ,   
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Question = mongoose.model('Question', questionSchema)
module.exports = { Question, questionSchema }