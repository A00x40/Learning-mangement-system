const mongoose = require('mongoose');
const { resultsSchema } = require('./results.model');

var courseLearnerSchema = new mongoose.Schema({
    learner : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Learner", 
        required: true
    } ,
    progress : {
        type: Number, 
        minmum: 0,
        maxmum: 100,
        default: 0 
    } ,
    //results : [resultsSchema]
}, { _id: false });

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 1,
            maxlength: 50,
            required :[ true , 'please enter course name'],
            unique: [ true , 'course name must be unique'],
            trim:true
        } ,
        imgUrl: {
            type: String, 
            //match: /\.(png|jpg|jpeg|svg)$/, 
            default: "default"
        } ,
        instructor: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Instructor",
            required: true
        } ,
        syllabus: [{
            type: String,
            required: true
        }] ,
        scores: [courseLearnerSchema]
    } ,
    {
        toJSON: {
          virtuals: true
        } ,
        toObject: {
          virtuals: true
        } 
    }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = { Course, courseSchema };