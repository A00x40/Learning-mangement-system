const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: 1,
            maxlength: 50,
            required :[ true , 'please enter course name'],
            trim:true
        } ,
        imgUrl: {
            type: String, 
            //match: /\.(png|jpg|jpeg|svg)$/, 
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
        learners : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Learner"
        }] ,
    } ,
    {
        toJSON: {
          virtuals: true
        } ,
        toObject: {
          virtuals: true
        } ,
        timestamps: true
    }
)

const Course = mongoose.model('Course', courseSchema)
module.exports = { Course, courseSchema }