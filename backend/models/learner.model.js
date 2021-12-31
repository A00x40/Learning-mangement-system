const mongoose = require('mongoose');
const { User } = require('./user.model');

const learnerSchema = new mongoose.Schema(
    {
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

const Learner = User.discriminator('Learner', learnerSchema);
module.exports = { Learner, learnerSchema };