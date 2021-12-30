const mongoose = require('mongoose');
const { User } = require('./user.model');

const instructorSchema = new mongoose.Schema(
    {
        courses : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
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