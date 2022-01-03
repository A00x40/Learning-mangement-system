const mongoose = require('mongoose');
const { answerSchema } = require('./answer.model');

const postSchema = new mongoose.Schema({
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
    answers: [answerSchema] ,
     
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = { Post, postSchema };