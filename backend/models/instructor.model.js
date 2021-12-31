const mongoose = require('mongoose');
const { User } = require('./user.model');

const instructorSchema = new mongoose.Schema(
    {
        ownedCourses : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course",
            unique: [true , "User can't own a course he already owns (no duplicates)"]
        }],

        courses : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course",
            unique: [true , "User can't enroll in a course he already is in (no duplicates)"]
        }]
        
    } ,
    {
        toJSON: {
          virtuals: true
        } ,
        toObject: {
          virtuals: true
        } ,
        discriminatorKey: 'type'
    }
)

const Instructor = User.discriminator('Instructor', instructorSchema);
module.exports = { Instructor, instructorSchema };