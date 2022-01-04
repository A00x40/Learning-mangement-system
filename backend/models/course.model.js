const mongoose = require('mongoose');

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