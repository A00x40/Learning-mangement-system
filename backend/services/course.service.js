const { Course } = require("../models/course.model");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Answer } = require("../models/answer.model");

// Add Course to instructor courses
exports.createCourse = async(newCourse, user) => {
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
    
    let enrolledUser = await User.findOneAndUpdate(
        {
            _id: user._id
        },
        {
            $push: { courses: course._id }
        },
        {
            new: true
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
exports.getQuestions = async (id) => { 
    return await Post.find({_id: id});   
};

// Get all answers of a question
exports.getAnswers = async (question) => { 
    return await Answer.find({_id: question._id});
};


