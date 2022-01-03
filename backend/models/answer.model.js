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
    addedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = { Answer, answerSchema };