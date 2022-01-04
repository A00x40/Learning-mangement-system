const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required: [true, "Uploaded file must have a name"]
        },

        // PDFs have null path (stored in public)
        path : {
            type : String,
            required: true
        },
        course: {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    } ,
    {
        toJSON: {
            virtuals: true
        } ,
        toObject: {
            virtuals: true
        } 
    }
)

const Activity = mongoose.model('Activity', activitySchema)
module.exports = { Activity, activitySchema }