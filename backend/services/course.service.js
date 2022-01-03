const { Course } = require("../models/course.model");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Answer } = require("../models/answer.model");

// Add Course to instructor created or to learner enrolled courses

exports.createCourse = async(newCourse, user) => {
    let course = await Course.create(newCourse);
    
    course = course.toJSON();
    await updateUserCourses(user, course);
    return course;
};

exports.enrollInCourse = async (course, user) => {    
    let updatedCourse = await Course.findById({ _id: course._id});
    return updatedCourse
};

// 
//Add new question with empty answers
exports.addQAThread = async (newPost) => { 
    let question = await Post.create(newPost);
    
    return question.toJSON();   
};

//Get all questions of a course to display in q&a section
exports.getQAs = async (course) => { 
    let questions = await Post.find({course})
    
    return questions;   
};

//Add a reply answer to a question post
exports.addQAReply = async (postId, newReply) => {  
    let reply = await Answer.create(newReply);
    
    reply = reply.toJSON();
    await Post.findOneAndUpdate({_id: postId}, { $push: { answers: reply._id } });
    return reply;
};


// Up or Down Vote & modify best answer
exports.updateQAReply = async (replyId, score) => { 
    let reply = await Answer.findOneAndUpdate({_id : replyId}, {upvoteCount: score} ,{
        new: true
    });
    
    return reply;
};