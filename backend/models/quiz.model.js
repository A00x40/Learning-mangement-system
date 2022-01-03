import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    name: {
        type: String,
        required: true
    } ,
    maximum : {
        type : Number,
        required: true
    } ,
    avg : {
        type : Number,
        required: true
    } 
});

const Quiz = model('Quiz', quizSchema);
export default { Quiz, quizSchema };