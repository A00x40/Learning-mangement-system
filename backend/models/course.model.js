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
            ref : "Professor",
            required: true
        } ,
        students : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Student"
        }]
    } ,
    {
        toJSON: {
          virtuals: true
        } ,
        toObject: {
          virtuals: true
        } ,
    }
)

const Course = mongoose.model('Course', courseSchema)
module.exports = { Course, courseSchema }