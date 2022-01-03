const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
        // (Should be unique)
        username : {
            type : String,
            minlength: 1,
            maxlength: 30,
            trim: true,
            required : [true , 'please enter your name'],
            unique : [true , 'this username is already used']
        } ,

        // exclude from query results
        password : {
            type : String,
            minlength: 6,
            select: false,
            required : [true , "password is required"]
        } ,

        firstname : {
            type : String,
            trim: true,
            required : [true , 'please enter your firstname']
        } ,

        lastname : {
            type : String,
            trim: true,
            required : [true , 'please enter your lastname'] 
        } ,

        birthdate : {
            type : Date,
            required : [true , 'please enter your birthdate'] 
        } ,  

        // (Should be unique)
        email :  {
            type : String,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email!'],
            required :[ true , 'please enter your email'],
            unique : [true , 'this email is already used']
        } ,

        // (admin/customer)
        type :  {
            type : String,
            default: "customer"
        } ,

        key :  {
            type : Number,
            required : [true , 'please enter learner or instructor']
        } ,

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

const User = mongoose.model('User', userSchema)
module.exports = { User, userSchema }