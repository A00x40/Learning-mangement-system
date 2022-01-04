const { Course } = require("../models/course.model");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Answer } = require("../models/answer.model");

// Add Course to instructor courses
exports.createCourse = async(newCourse, user) => {
    // Learners don't create courses
    if(user.type == 0) return {}

    newCourse.instructor = user._id

    let course = await Course.create(newCourse);
    course = course.toJSON();

    await User.findOneAndUpdate(
        {
            _id: user._id
        },
        {
            $push: { courses: course._id }
        }
    );
    return course;
};

// Add Course to learner courses
exports.enrollInCourse = async (course, user) => {    
    // Instructors don't enroll in courses
    if(user.type == 1) return {};

    let enrolledUser = await User.findOneAndUpdate(
        {
            _id: user._id
        },
        {
            $push: { courses: course._id }
        }
    );
    return enrolledUser
};

 
//Add new question with empty answers
exports.addQuestionThread = async (newPost) => { 
    return await Post.create(newPost);
};

// Add a reply answer to a question post
exports.addAnswer = async (newAnswer) => {  
    return await Answer.create(newAnswer);
};

// Get all questions of a course to display in q&a section
exports.getQuestions = async (course) => { 
    return await Post.findMany({_id: course._id}).exec();   
};

// Get all answers of a question
exports.getAnswers = async (question) => { 
    return await Answer.findMany({question}).exec();
};


